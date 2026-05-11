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
    const { sourceUrl } = body;

    if (!sourceUrl) {
      return Response.json({ error: 'Missing sourceUrl' }, { status: 400, headers: corsHeaders });
    }

    // 1. Create job: import from URL, convert to PDF, export
    const jobRes = await fetch(`${CLOUDCONVERT_BASE}/jobs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tasks: {
          'import-task': { operation: 'import/url', url: sourceUrl, filename: 'page.html' },
          'convert-task': { operation: 'convert', input: 'import-task', output_format: 'pdf' },
          'export-task': { operation: 'export/url', input: 'convert-task' }
        }
      })
    });
    const job = await jobRes.json();
    if (!jobRes.ok) return Response.json({ error: job.message || 'Job creation failed' }, { status: 500, headers: corsHeaders });

    // 2. Poll until finished
    const jobId = job.data.id;
    let finished = false;
    let finalJob: any;
    for (let i = 0; i < 60 && !finished; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await fetch(`${CLOUDCONVERT_BASE}/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      finalJob = await pollRes.json();
      const status = finalJob.data.status;
      if (status === 'finished' || status === 'error') finished = true;
    }

    if (!finalJob || finalJob.data.status === 'error') {
      return Response.json({ error: 'Conversion failed on CloudConvert' }, { status: 500, headers: corsHeaders });
    }
    if (!finished) {
      return Response.json({ error: 'Timeout waiting for conversion' }, { status: 500, headers: corsHeaders });
    }

    // 3. Download and return as base64
    const exportTask = finalJob.data.tasks.find((t: any) => t.name === 'export-task');
    const downloadUrl = exportTask.result.files[0].url;
    const filename = exportTask.result.files[0].filename;

    const fileRes = await fetch(downloadUrl);
    const buffer = await fileRes.arrayBuffer();
    const uint8 = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < uint8.length; i++) binary += String.fromCharCode(uint8[i]);
    const base64Result = btoa(binary);

    return Response.json({ base64: base64Result, filename }, { headers: corsHeaders });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500, headers: corsHeaders });
  }
});
