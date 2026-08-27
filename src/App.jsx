import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import HomeView from './views/HomeView';
import DiscoverView from './views/DiscoverView';
import JournalView from './views/JournalView';
import MealCategoryView from './views/MealCategoryView';
import ProfileView from './views/ProfileView';

// Modals
import RecipeDetailModal from './components/RecipeDetailModal';
import CookingModeModal from './components/CookingModeModal';
import InspirationCardModal from './components/InspirationCardModal';
import FridgeHeroModal from './components/FridgeHeroModal';
import AiRecipeOrganizerModal from './components/AiRecipeOrganizerModal';
import InductionCookerModal from './components/InductionCookerModal';
import AddRecipeModal from './components/AddRecipeModal';
import AiConfigModal from './components/AiConfigModal';

import { loadDatabaseState, saveDatabaseState } from './services/dbStorage';
import { fetchGlobalState, pushToGlobalState, localClientId } from './services/cfSyncService';

export default function App() {
  // Initialize state directly from universal persistent storage
  const [dbState, setDbState] = useState(() => loadDatabaseState());
  const recipes = dbState.recipes;
  const userState = dbState.userState || {};
  const cookedHistory = userState.cookedHistory || [];

  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMealCategory, setActiveMealCategory] = useState(null);

  // Modals state
  const [showInspirationModal, setShowInspirationModal] = useState(false);
  const [showFridgeModal, setShowFridgeModal] = useState(false);
  const [showAiOrganizerModal, setShowAiOrganizerModal] = useState(false);
  const [showInductionModal, setShowInductionModal] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showAiConfigModal, setShowAiConfigModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [cookingModeRecipe, setCookingModeRecipe] = useState(null);

  // Derive active recipe detail reactively
  const selectedRecipeDetail = recipes.find(r => r.id === selectedRecipeId) || null;

  const dbStateRef = useRef(dbState);
  dbStateRef.current = dbState;

  // Auto Cloudflare KV Sync Polling
  const triggerCloudflareSync = async () => {
    const cloudData = await fetchGlobalState();
    
    // 如果云端是空的，只向云端推送，不覆盖本地
    if (!cloudData) {
      pushToGlobalState(dbStateRef.current.recipes, dbStateRef.current.userState);
      return;
    }

    // 防自我覆盖机制：如果是自己刚推送到云端的，忽略
    if (cloudData.senderId === localClientId) {
      return; 
    }
    
    // 强制采用云端最新事实
    const nextRecipes = cloudData.recipes || [];
    const nextUserState = cloudData.userState || {};
    
    setDbState({ recipes: nextRecipes, userState: nextUserState });
    saveDatabaseState(nextRecipes, nextUserState); // 更新本地缓存
  };

  useEffect(() => {
    triggerCloudflareSync(); // 挂载时立即执行一次

    // 2.5s 轮询拉取（由于去掉了系统时间对比，现在的轮询非常安全）
    const syncInterval = setInterval(() => {
      triggerCloudflareSync();
    }, 2500);

    const handleFocus = () => {
      triggerCloudflareSync();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        triggerCloudflareSync();
      }
    });

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Save to persistent storage and push to Firebase
  const updateDatabaseState = (nextRecipes, nextUserState) => {
    const normalized = saveDatabaseState(nextRecipes, nextUserState);
    setDbState(normalized);
    pushToGlobalState(normalized.recipes, normalized.userState);
  };

  // Toggle Favorite (Supports both Favoriting and Un-favoriting seamlessly)
  const handleToggleFavorite = (recipeId) => {
    const activeFavSet = new Set(
      Array.isArray(userState.favoriteIds)
        ? userState.favoriteIds
        : recipes.filter(r => r.isFavorite).map(r => r.id)
    );

    if (activeFavSet.has(recipeId)) {
      activeFavSet.delete(recipeId);
    } else {
      activeFavSet.add(recipeId);
    }

    const nextFavArray = Array.from(activeFavSet);
    const nextUserState = {
      ...userState,
      favoriteIds: nextFavArray,
      lastModified: Date.now()
    };

    updateDatabaseState(recipes, nextUserState);
  };

  // Toggle Like (Supports both Liking and Un-liking seamlessly)
  const handleToggleLike = (recipeId) => {
    const activeLikeSet = new Set(
      Array.isArray(userState.likedIds)
        ? userState.likedIds
        : recipes.filter(r => r.isLiked).map(r => r.id)
    );

    if (activeLikeSet.has(recipeId)) {
      activeLikeSet.delete(recipeId);
    } else {
      activeLikeSet.add(recipeId);
    }

    const nextLikeArray = Array.from(activeLikeSet);
    const nextUserState = {
      ...userState,
      likedIds: nextLikeArray,
      lastModified: Date.now()
    };

    updateDatabaseState(recipes, nextUserState);
  };

  const rawHistory = userState.cookedHistory || [];
  const hydratedHistory = rawHistory.map(log => {
    const rec = recipes.find(r => r.id === (log.recipeId || log.id));
    if (rec) {
      return {
        ...log,
        id: rec.id,
        title: rec.title,
        coverImage: rec.coverImage,
        cookTime: rec.cookTime,
        calories: rec.calories
      };
    }
    return { ...log, id: log.recipeId || log.id, title: log.title || '已删除的菜谱', coverImage: log.coverImage || '' };
  });

  // Log Cooked History
  const handleLogCooked = (recipe, photoUrl = null) => {
    const d = new Date();
    const localDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    const logItem = {
      recipeId: recipe.id,
      date: localDateStr,
      timestamp: Date.now()
    };

    // 去重逻辑：同一道菜在【同一天】只记录一次（防手抖），但允许跨天记录，形成真正的打卡日历
    const filteredHistory = rawHistory.filter(item => !((item.recipeId === logItem.recipeId || item.id === logItem.recipeId) && item.date === logItem.date));
    
    // 强制瘦身：将存入数据库的历史记录全部转为轻量级格式，剔除冗余的图片和文字数据
    const nextHistory = [logItem, ...filteredHistory].map(item => ({
      recipeId: item.recipeId || item.id,
      date: item.date,
      timestamp: item.timestamp
    }));

    const nextUserState = {
      ...userState,
      cookedHistory: nextHistory,
      lastModified: Date.now()
    };

    updateDatabaseState(recipes, nextUserState);
  };

  // Delete / Undo Cooked History Item
  const handleDeleteHistoryItem = (timestampOrId) => {
    const nextHistory = rawHistory.filter(item => item.timestamp !== timestampOrId && item.id !== timestampOrId && item.recipeId !== timestampOrId);
    const nextUserState = {
      ...userState,
      cookedHistory: nextHistory,
      lastModified: Date.now()
    };
    updateDatabaseState(recipes, nextUserState);
  };

  // Add Custom / AI Parsed Recipe
  const handleAddRecipe = (newRecipe) => {
    const recipeToAdd = {
      ...newRecipe,
      id: newRecipe.id || `custom_${Date.now()}`
    };
    const updatedRecipes = [recipeToAdd, ...recipes];

    const currentFavs = new Set(userState.favoriteIds || []);
    currentFavs.add(recipeToAdd.id);

    const nextUserState = {
      ...userState,
      favoriteIds: Array.from(currentFavs),
      lastModified: Date.now()
    };

    updateDatabaseState(updatedRecipes, nextUserState);
  };

  // Reset entire database to zero
  const handleResetData = () => {
    if (window.confirm('⚠️ 确定要将所有做饭记录和数据清零吗？此操作将重置为初始干净状态。')) {
      try {
        localStorage.removeItem('cookoo_universal_db_v1');
      } catch (e) {}
      const clean = loadDatabaseState();
      setDbState(clean);
      pushToGlobalState(clean.recipes, clean.userState);
      alert('✨ 数据已全部清零，重新开始自炊生活！');
    }
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('🗑️ 确定要彻底删除这个菜谱吗？')) {
      const nextRecipes = recipes.filter(r => r.id !== recipeId);
      updateDatabaseState(nextRecipes, userState);
    }
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    const nextRecipes = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    updateDatabaseState(nextRecipes, userState);
  };

  // Export JSON Database
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ userState, recipes }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cookoo_recipes_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="app-container">
      {/* Dynamic Sub-page or Tab Routing */}
      {activeMealCategory ? (
        <MealCategoryView
          mealType={activeMealCategory}
          recipes={recipes}
          onBack={() => setActiveMealCategory(null)}
          onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
        />
      ) : (
        <>
          {activeTab === 'home' && (
            <HomeView
              recipes={recipes}
              cookedHistory={hydratedHistory}
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onOpenMealCategory={(mealKey) => setActiveMealCategory(mealKey)}
              onOpenFridge={() => setShowFridgeModal(true)}
              onOpenAiOrganizer={() => setShowAiOrganizerModal(true)}
              onNavigateDiscover={() => setActiveTab('discover')}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverView 
              recipes={recipes} 
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)} 
              onEditRecipe={(r) => {
                setEditingRecipe(r);
                setShowAddRecipeModal(true);
              }}
              onDeleteRecipe={handleDeleteRecipe}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'journal' && (
            <JournalView
              cookedHistory={hydratedHistory}
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onOpenAddRecipe={() => setShowAddRecipeModal(true)}
              onDeleteHistoryItem={handleDeleteHistoryItem}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              recipes={recipes}
              cookedHistory={hydratedHistory}
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onExportData={handleExportData}
              onResetData={handleResetData}
              onOpenAiConfig={() => setShowAiConfigModal(true)}
              onOpenSyncCodeModal={() => setShowSyncCodeModal(true)}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </>
      )}

      {/* Persistent Mobile Bottom Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveMealCategory(null);
          setActiveTab(tab);
        }}
        onOpenAddRecipe={() => setShowAddRecipeModal(true)}
        onOpenAiOrganizer={() => setShowAiOrganizerModal(true)}
      />

      {/* Global Drawers & Modals */}
      {showInspirationModal && (
        <InspirationCardModal
          recipes={recipes}
          onClose={() => setShowInspirationModal(false)}
          onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
          onOpenCookingMode={(r) => setCookingModeRecipe(r)}
        />
      )}

      {showFridgeModal && (
        <FridgeHeroModal
          recipes={recipes}
          onClose={() => setShowFridgeModal(false)}
          onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
          onAddRecipe={handleAddRecipe}
          onOpenAiConfig={() => setShowAiConfigModal(true)}
        />
      )}

      {showAiOrganizerModal && (
        <AiRecipeOrganizerModal
          onClose={() => setShowAiOrganizerModal(false)}
          onAddParsedRecipe={handleAddRecipe}
          onOpenAiConfig={() => setShowAiConfigModal(true)}
        />
      )}

      {showInductionModal && (
        <InductionCookerModal
          recipes={recipes}
          onClose={() => setShowInductionModal(false)}
          onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
          onOpenCookingMode={(r) => setCookingModeRecipe(r)}
        />
      )}

      {showAddRecipeModal && (
        <AddRecipeModal
          onClose={() => {
            setShowAddRecipeModal(false);
            setEditingRecipe(null);
          }}
          onSave={(recipe) => {
            if (editingRecipe) {
              handleUpdateRecipe(recipe);
            } else {
              handleAddRecipe(recipe);
            }
            setShowAddRecipeModal(false);
            setEditingRecipe(null);
          }}
          initialData={editingRecipe}
        />
      )}

      {showAiConfigModal && (
        <AiConfigModal
          onClose={() => setShowAiConfigModal(false)}
        />
      )}

      {selectedRecipeDetail && (
        <RecipeDetailModal
          recipe={selectedRecipeDetail}
          onClose={() => setSelectedRecipeId(null)}
          onToggleFavorite={handleToggleFavorite}
          onToggleLike={handleToggleLike}
          onLogCooked={handleLogCooked}
          onOpenCookingMode={(r) => {
            setSelectedRecipeId(null);
            setCookingModeRecipe(r);
          }}
        />
      )}

      {cookingModeRecipe && (
        <CookingModeModal
          recipe={cookingModeRecipe}
          onClose={() => setCookingModeRecipe(null)}
          onFinishCooked={handleLogCooked}
        />
      )}
    </div>
  );
}
