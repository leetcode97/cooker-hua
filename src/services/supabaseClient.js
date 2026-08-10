import { createClient } from '@supabase/supabase-js';

const STORAGE_CONFIG_KEY = 'cookoo_supabase_config';

// User's project configuration
const DEFAULT_SUPABASE_URL = 'https://elbmjvxmnohmzjtjqwqt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_mgtaiL3ARE_-rV6imrqAkQ_8u6Pq8ys';

export function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.key) {
        return parsed;
      }
    }
  } catch (e) {}

  return {
    url: DEFAULT_SUPABASE_URL,
    key: DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveSupabaseConfig(url, key) {
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify({ url: url.trim(), key: key.trim() }));
    // Re-initialize client
    supabaseInstance = createClient(url.trim(), key.trim());
  } catch (e) {}
}

const config = getSupabaseConfig();
let supabaseInstance = createClient(config.url, config.key);

export function getSupabase() {
  return supabaseInstance;
}
