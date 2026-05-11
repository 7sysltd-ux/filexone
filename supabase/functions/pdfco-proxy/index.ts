import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PDFCO_BASE = 'https://api.pdf.co/v1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-user-token, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { endpoint, payload } = body;

    if (!endpoint) {
      return Response.json({ error: 'Missing endpoint' }, { status: 400, headers: corsHeaders });
    }

    const apiKey = Deno.env.get('PDFCO_API_KEY');
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500, headers: corsHeaders });
    }

    // Handle file upload via base64
    if (endpoint === 'file/upload') {
      const { fileBase64, fileName, mimeType } = payload;
      const byteString = atob(fileBase64);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mimeType || 'application/octet-stream' });
      const formData = new FormData();
      formData.append('file', blob, fileName || 'file.pdf');

      const res = await fetch(`${PDFCO_BASE}/file/upload`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey },
        body: formData,
      });
      const data = await res.json();
      return Response.json(data, { headers: corsHeaders });
    }

    // Handle conversion endpoints
    const res = await fetch(`${PDFCO_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return Response.json(data, { headers: corsHeaders });

  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500, headers: corsHeaders });
  }
});
