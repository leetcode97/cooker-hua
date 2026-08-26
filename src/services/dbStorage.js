import { DEFAULT_DATABASE } from '../data/defaultDatabase';

const STORAGE_KEY = 'cookoo_universal_db_v1';

// Safe Pristine Recipe Sanitizer
export function sanitizeRecipe(r) {
  if (!r || typeof r !== 'object') return null;

  // For all built-in curated recipes, ALWAYS preserve 100% clean UTF-8 text from DEFAULT_DATABASE
  const defaultRecipe = DEFAULT_DATABASE.recipes.find(d => d.id === r.id);
  if (defaultRecipe) {
    return {
      ...defaultRecipe,
      isFavorite: Boolean(r.isFavorite),
      isLiked: Boolean(r.isLiked),
      likes: r.isLiked ? (r.likes > 0 ? r.likes : 1) : 0
    };
  }

  // For user's custom added recipes, sanitize any broken characters
  return {
    ...r,
    title: (r.title || '美味自炊菜').replace(/[\uFFFD\?]/g, '').trim() || '美味自炊菜',
    subtitle: (r.subtitle || '').replace(/[\uFFFD]/g, '').trim(),
    tags: Array.isArray(r.tags) ? r.tags.map(t => typeof t === 'string' ? t.replace(/[\uFFFD]/g, '').trim() : t) : [],
    steps: Array.isArray(r.steps) ? r.steps : []
  };
}

// Architected State Normalization
export function normalizeState(rawRecipes, rawUserState) {
  const recipes = Array.isArray(rawRecipes) && rawRecipes.length > 0
    ? rawRecipes.filter(r => r && typeof r === 'object' && (r.id || r.title)).map(sanitizeRecipe)
    : DEFAULT_DATABASE.recipes;

  const userState = rawUserState && typeof rawUserState === 'object'
    ? rawUserState
    : (DEFAULT_DATABASE.userState || { cookedHistory: [], favoriteIds: [], likedIds: [] });

  const favArray = Array.isArray(userState.favoriteIds)
    ? userState.favoriteIds
    : recipes.filter(r => r.isFavorite).map(r => r.id);

  const likeArray = Array.isArray(userState.likedIds)
    ? userState.likedIds
    : recipes.filter(r => r.isLiked).map(r => r.id);

  const favoriteSet = new Set(favArray);
  const likedSet = new Set(likeArray);

  const normalizedRecipes = recipes.map(r => ({
    ...r,
    isFavorite: favoriteSet.has(r.id),
    isLiked: likedSet.has(r.id),
    likes: likedSet.has(r.id) ? (r.likes > 0 ? r.likes : 1) : 0
  }));

  const normalizedUserState = {
    ...userState,
    favoriteIds: Array.from(favoriteSet),
    likedIds: Array.from(likedSet),
    cookedHistory: Array.isArray(userState.cookedHistory) ? userState.cookedHistory.map(sanitizeRecipe) : [],
    lastModified: userState.lastModified || Date.now()
  };

  return {
    recipes: normalizedRecipes,
    userState: normalizedUserState
  };
}

// 1. Load initial database state
export function loadDatabaseState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.recipes) && parsed.recipes.length > 0) {
        return normalizeState(parsed.recipes, parsed.userState);
      }
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }

  // Initialize with clean default database
  const cleanDefault = normalizeState(DEFAULT_DATABASE.recipes, DEFAULT_DATABASE.userState);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanDefault));
  } catch (e) {}

  return cleanDefault;
}

// 2. Save database state to localStorage
export function saveDatabaseState(recipes, userState) {
  try {
    const normalized = normalizeState(recipes, userState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (e) {
    console.warn('Error saving to localStorage:', e);
    return { recipes, userState };
  }
}
