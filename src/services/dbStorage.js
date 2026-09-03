import { DEFAULT_DATABASE } from '../data/defaultDatabase';

const STORAGE_KEY = 'cookoo_universal_db_v1';

// Safe Pristine Recipe Sanitizer
export function sanitizeRecipe(r) {
  if (!r || typeof r !== 'object') return null;

  const defaultRecipe = DEFAULT_DATABASE.recipes.find(d => d.id === r.id);

  let cleanTags = Array.isArray(r.tags)
    ? r.tags.map(t => typeof t === 'string' ? t.replace(/[\uFFFD]/g, '').trim() : t).filter(Boolean)
    : [];

  // If it's a built-in recipe and only contains old seed tags, migrate to the clean seed tags
  const legacyTags = ['⚡ 5分钟极速', '吐司主食', '平底锅快炒', '电磁炉友好', '温暖汤粥', '电饭煲一锅出', '一锅端', '懒人主食', '10分钟快手', '嫩肉免高压', '无油烟蒸菜', '极速', '电饭煲'];
  const hasLegacyOnly = cleanTags.length > 0 && cleanTags.every(t => legacyTags.includes(t) || t === '早餐' || t === '午餐' || t === '晚餐' || t === '夜宵');
  if (defaultRecipe && (cleanTags.length === 0 || hasLegacyOnly)) {
    cleanTags = defaultRecipe.tags;
  }

  return {
    ...(defaultRecipe || {}),
    ...r,
    tags: cleanTags,
    title: (r.title || defaultRecipe?.title || '美味自炊菜').replace(/[\uFFFD\?]/g, '').trim(),
    subtitle: (r.subtitle || defaultRecipe?.subtitle || '').replace(/[\uFFFD]/g, '').trim(),
    steps: Array.isArray(r.steps) && r.steps.length > 0 ? r.steps : (defaultRecipe?.steps || []),
    ingredients: Array.isArray(r.ingredients) && r.ingredients.length > 0 ? r.ingredients : (defaultRecipe?.ingredients || [])
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
    tags: Array.isArray(r.tags) ? r.tags : [],
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
