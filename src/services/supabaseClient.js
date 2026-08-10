import { createClient } from '@supabase/supabase-js';

const STORAGE_CONFIG_KEY = 'cookoo_supabase_config';

// Default Supabase project configuration (can be configured via UI or .env)
const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://oagpuvbquqyltfxqvyqf.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZ3B1dmJxdXF5bHRmeHF2eXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODgwMDAsImV4cCI6MjA1NDA2NDAwMH0.sample';

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
