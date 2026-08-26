export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.COOKOO_KV;
  const GLOBAL_KEY = 'cookoo_global_state';

  // CORS 预检请求处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.text(); 
      if (kv) {
        // 全局状态永久存储
        await kv.put(GLOBAL_KEY, body);
      }
      return new Response(JSON.stringify({ success: true, kvUsed: !!kv }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid Request' }), { status: 400 });
    }
  }

  if (request.method === 'GET') {
    let data = null;
    if (kv) {
      data = await kv.get(GLOBAL_KEY, 'json');
    }
    return new Response(JSON.stringify({ data, kvUsed: !!kv }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' // 彻底禁止各级缓存
      }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}
