/**
 * VisionForge AI API Client Service
 */

const API_BASE = '/api';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Health check failed:', err);
    return { status: 'offline', error: err.message };
  }
}

export async function previewIntent(payload) {
  const res = await fetch(`${API_BASE}/intent-preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return null;
  return await res.json();
}

export async function generateImage(payload) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Network request failed' }));
    throw new Error(errorData.detail || 'Image generation failed');
  }

  return await res.json();
}
