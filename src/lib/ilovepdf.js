/**
 * iLovePDF REST API client (browser-compatible)
 * Docs: https://developer.ilovepdf.com/docs/api-reference
 */

const PUBLIC_KEY = 'project_public_61fde910467dd1d9574eb7d7544644d9_pMqXje6855d7b55291578e35eccd9792377f1';
const API_BASE = 'https://api.ilovepdf.com/v1';

async function getToken() {
  const res = await fetch(`${API_BASE}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ public_key: PUBLIC_KEY }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`iLovePDF auth failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.token;
}

async function startTask(token, tool) {
  const res = await fetch(`${API_BASE}/start/${tool}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to start task "${tool}": ${res.status} ${text}`);
  }
  const data = await res.json();
  return { server: data.server, taskId: data.task };
}

async function uploadFile(token, server, taskId, file) {
  const formData = new FormData();
  formData.append('task', taskId);
  formData.append('file', file, file.name);

  const res = await fetch(`https://${server}/v1/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.server_filename;
}

async function processFiles(token, server, taskId, tool, fileObjs, extraParams = {}) {
  const body = {
    task: taskId,
    tool,
    files: fileObjs,
    ...extraParams,
  };

  const res = await fetch(`https://${server}/v1/process`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Processing failed: ${res.status} ${text}`);
  }
}

async function downloadResult(token, server, taskId) {
  const res = await fetch(`https://${server}/v1/download/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Download failed: ${res.status} ${text}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * Main entry point for all tools.
 * @param {string} tool - iLovePDF task name
 * @param {File|File[]} files - single file or array of files
 * @param {object} extraParams - extra params for the process call
 * @param {function} onProgress - optional progress callback (0-100)
 * @returns {Promise<{url: string, outputSize?: number}>}
 */
export async function runIlovepdf(tool, files, extraParams = {}, onProgress) {
  const progress = onProgress || (() => {});

  progress(5);
  const token = await getToken();

  progress(15);
  const { server, taskId } = await startTask(token, tool);

  const fileArray = Array.isArray(files) ? files : [files];
  const fileObjs = [];

  const uploadShare = 50; // 15→65
  for (let i = 0; i < fileArray.length; i++) {
    const serverFilename = await uploadFile(token, server, taskId, fileArray[i]);
    fileObjs.push({ server_filename: serverFilename, filename: fileArray[i].name });
    progress(15 + Math.round(((i + 1) / fileArray.length) * uploadShare));
  }

  progress(70);
  await processFiles(token, server, taskId, tool, fileObjs, extraParams);

  progress(85);
  const url = await downloadResult(token, server, taskId);

  progress(100);
  return url;
}