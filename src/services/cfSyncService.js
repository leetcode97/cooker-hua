export const localClientId = Math.random().toString(36).substring(2, 15);
const API_BASE = '/api/sync';

// 1. Fetch Global State from Cloudflare KV
export async function fetchGlobalState() {
  try {
    // 加上时间戳防止浏览器强缓存
    const res = await fetch(`${API_BASE}?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
  } catch (err) {
    console.warn('Sync fetch error:', err);
  }
  return null;
}

// 2. Push Global State to Cloudflare KV
export async function pushToGlobalState(recipes, userState) {
  const payload = {
    recipes: recipes || [],
    userState: userState || {},
    senderId: localClientId,
    pushTimestamp: Date.now()
  };

  try {
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (e) {
    console.error('Push error:', e);
  }
}
