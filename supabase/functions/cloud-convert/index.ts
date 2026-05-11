import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CLOUDCONVERT_BASE = 'https://api.cloudconvert.com/v2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-user-token, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('CLOUDCONVERT_API_KEY');
    if (!apiKey) return Response.json({ error: 'API key not configured' }, { status: 500, headers: corsHeaders });

    const body = await req.json();
    const { outputFormat, fileBase64, fileName } = body;

    if (!outputFormat || !fileBase64 || !fileName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders });
    }

    // 1. Create job
    const jobRes = await fetch(`${CLOUDCONVERT_BASE}/jobs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tasks: {
          'upload-task': { operation: 'import/upload' },
          'convert-task': { operation: 'convert', input: 'upload-task', input_format: 'pdf', output_format: outputFormat },
          'export-task': { operation: 'export/url', input: 'convert-task' }
        }
      })
    });
    const job = await jobRes.json();
    if (!jobRes.ok) return Response.json({ error: job.message || 'Job creation failed' }, { status: 500, headers: corsHeaders });

    const uploadTask = job.data.tasks.find((t: any) => t.name === 'upload-task');

    // 2. Upload file
    const byteString = atob(fileBase64);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) byteArray[i] = byteString.charCodeAt(i);
    const fileBlob = new Blob([byteArray], { type: 'application/pdf' });

    const formData = new FormData();
    for (const [k, v] of Object.entries(uploadTask.result.form.parameters)) formData.append(k, v as string);
    formData.append('file', fileBlob, fileName);

    const uploadRes = await fetch(uploadTask.result.form.url, { method: 'POST', body: formData });
    if (!uploadRes.ok) {
      const txt = await uploadRes.text();
      return Response.json({ error: `Upload failed: ${txt}` }, { status: 500, headers: corsHeaders });
    }

    // 3. Poll until finished
    let finished = false;
    let finalJob: any;
    const jobId = job.data.id;

    for (let i = 0; i < 10 && !finished; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const pollRes = await fetch(`${CLOUDCONVERT_BASE}/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      finalJob = await pollRes.json();
      if (finalJob.data.status === 'finished' || finalJob.data.status === 'error') finished = true;
    }

    for (let i = 0; i < 25 && !finished; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const pollRes = await fetch(`${CLOUDCONVERT_BASE}/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      finalJob = await pollRes.json();
      if (finalJob.data.status === 'finished' || finalJob.data.status === 'error') finished = true;
    }

    if (!finalJob || finalJob.data.status === 'error') {
      const errTask = finalJob?.data?.tasks?.find((t: any) => t.status === 'error');
      return Response.json({ error: errTask?.message || 'Conversion failed' }, { status: 500, headers: corsHeaders });
    }
    if (!finished) {
      return Response.json({ error: 'Conversion timeout — try a smaller PDF' }, { status: 500, headers: corsHeaders });
    }

    // 4. Download and return as base64
    const exportTask = finalJob.data.tasks.find((t: any) => t.name === 'export-task');
    if (!exportTask?.result?.files?.[0]) {
      return Response.json({ error: 'No output file found' }, { status: 500, headers: corsHeaders });
    }

    const fileRes = await fetch(exportTask.result.files[0].url);
    const buffer = await fileRes.arrayBuffer();
    const uint8 = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
    const base64Result = btoa(binary);

    return Response.json(
      { base64: base64Result, filename: exportTask.result.files[0].filename },
      { headers: corsHeaders }
    );
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500, headers: corsHeaders });
  }
});
