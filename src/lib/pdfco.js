import { invokeFunction } from './api';

/**
 * Convert a PDF file using the backend proxy function.
 * @param {File} file - The PDF file to convert
 * @param {string} endpoint - endpoint path (e.g. 'pdf/convert/to/doc')
 * @param {Function} onProgress - optional progress callback (0-100)
 * @returns {Promise<string>} - Object URL for the converted file
 */
export async function convertWithPdfco(file, endpoint, onProgress) {

  onProgress?.(10);

  // Step 1: Upload file — convert to base64 for backend function
  const fileBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const uploadRes = await invokeFunction('pdfco-proxy', {
    endpoint: 'file/upload',
    payload: { fileBase64, fileName: file.name, mimeType: file.type },
  });
  const uploadData = uploadRes.data;
  if (uploadData.error) throw new Error(uploadData.message || 'Upload failed');

  onProgress?.(40);

  // Step 2: Convert via backend proxy
  const convertRes = await invokeFunction('pdfco-proxy', {
    endpoint: endpoint.replace(/^\//, ''),
    payload: { url: uploadData.url, async: false, inline: false },
  });
  const convertData = convertRes.data;
  if (convertData.error) throw new Error(convertData.message || 'Conversion failed');

  onProgress?.(80);

  // Step 3: Download the result
  const downloadRes = await fetch(convertData.url);
  const blob = await downloadRes.blob();

  onProgress?.(100);

  return URL.createObjectURL(blob);
}
