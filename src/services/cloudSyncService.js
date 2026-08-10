import { getSupabase } from './supabaseClient';

// 1. Auth Methods
export async function signUpWithEmail(email, password) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email, password) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signInWithGitHub() {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (e) {
    return null;
  }
}

// 2. Cloud Database Sync (user_cookoo_data table)
export async function fetchCloudUserData(userId) {
  if (!userId) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('user_cookoo_data')
      .select('recipes, user_state, updated_at')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is normal for brand new users
      console.warn('Supabase fetch error:', error);
      return null;
    }

    return data ? { recipes: data.recipes, userState: data.user_state } : null;
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return null;
  }
}

export async function pushUserDataToCloud(userId, recipes, userState) {
  if (!userId) return false;
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('user_cookoo_data')
      .upsert({
        user_id: userId,
        recipes: recipes || [],
        user_state: userState || {},
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.warn('Supabase upsert error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to push to Supabase:', err);
    return false;
  }
}

// 3. Smart Local + Cloud Merge Algorithm
export function mergeLocalAndCloudData(localRecipes = [], localHistory = [], cloudRecipes = [], cloudHistory = []) {
  // Merge Recipes (deduplicate by id or title, prioritize local changes)
  const recipeMap = new Map();
  
  // 1. Put cloud recipes
  if (Array.isArray(cloudRecipes)) {
    cloudRecipes.forEach(r => {
      const key = r.id || r.title;
      if (key) recipeMap.set(key, r);
    });
  }

  // 2. Overlay local recipes
  if (Array.isArray(localRecipes)) {
    localRecipes.forEach(r => {
      const key = r.id || r.title;
      if (key) {
        const existing = recipeMap.get(key);
        recipeMap.set(key, {
          ...(existing || {}),
          ...r,
          // Preserve favorite / liked state if either is true
          isFavorite: Boolean(r.isFavorite || existing?.isFavorite),
          isLiked: Boolean(r.isLiked || existing?.isLiked),
          likes: (r.isLiked || existing?.isLiked) ? 1 : 0
        });
      }
    });
  }

  const mergedRecipes = Array.from(recipeMap.values());

  // Merge Cooked History (deduplicate by timestamp / title)
  const historyMap = new Map();
  const allHistory = [...(localHistory || []), ...(cloudHistory || [])];
  
  allHistory.forEach(item => {
    const key = `${item.id || item.title}_${item.date || ''}_${item.timestamp || ''}`;
    if (!historyMap.has(key)) {
      historyMap.set(key, item);
    }
  });

  const mergedHistory = Array.from(historyMap.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  return {
    recipes: mergedRecipes,
    userState: {
      cookedHistory: mergedHistory
    }
  };
}
