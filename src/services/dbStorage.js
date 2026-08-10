import { DEFAULT_DATABASE } from '../data/defaultDatabase';

const STORAGE_KEY = 'cookoo_universal_db_v1';
const API_BASE = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';

// Normalize recipe like counts to clean 0 by default (unless user liked it)
function normalizeRecipes(recipes) {
  if (!Array.isArray(recipes)) return DEFAULT_DATABASE.recipes;
  return recipes.map(r => ({
    ...r,
    likes: r.isLiked ? (r.likes > 0 ? r.likes : 1) : 0,
    isLiked: Boolean(r.isLiked),
    isFavorite: Boolean(r.isFavorite)
  }));
}

// 1. Load initial database state
export function loadDatabaseState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.recipes) && parsed.recipes.length > 0) {
        return {
          recipes: normalizeRecipes(parsed.recipes),
          userState: parsed.userState || DEFAULT_DATABASE.userState
        };
      }
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }

  // If no saved state in localStorage, initialize with default database
  const cleanDefault = {
    recipes: normalizeRecipes(DEFAULT_DATABASE.recipes),
    userState: DEFAULT_DATABASE.userState
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanDefault));
  } catch (e) {}

  return cleanDefault;
}

// 2. Save database state (persists immediately to localStorage and optionally syncs with backend)
export function saveDatabaseState(recipes, userState) {
  try {
    const stateToSave = {
      recipes: normalizeRecipes(recipes),
      userState: userState || { cookedHistory: [] }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (e) {
    console.warn('Error saving to localStorage:', e);
  }

  // Also sync to local backend if running locally
  if (window.location.hostname === 'localhost') {
    fetch(`${API_BASE}/user-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cookedHistory: userState?.cookedHistory || [] })
    }).catch(() => {});
  }
}
