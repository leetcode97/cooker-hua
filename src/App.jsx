import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import HomeView from './views/HomeView';
import DiscoverView from './views/DiscoverView';
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
import AuthModal from './components/AuthModal';

// Storage and Cloud Sync services
import { loadDatabaseState, saveDatabaseState } from './services/dbStorage';
import { getSupabase } from './services/supabaseClient';
import { getCurrentUser, fetchCloudUserData, pushUserDataToCloud, mergeLocalAndCloudData, signOutUser } from './services/cloudSyncService';

export default function App() {
  // Initialize state directly from universal persistent storage
  const [dbState, setDbState] = useState(() => loadDatabaseState());
  const recipes = dbState.recipes;
  const cookedHistory = dbState.userState?.cookedHistory || [];

  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMealCategory, setActiveMealCategory] = useState(null); // 'breakfast', 'lunch', 'dinner', 'night' or null

  // Modals state
  const [showInspirationModal, setShowInspirationModal] = useState(false);
  const [showFridgeModal, setShowFridgeModal] = useState(false);
  const [showAiOrganizerModal, setShowAiOrganizerModal] = useState(false);
  const [showInductionModal, setShowInductionModal] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showAiConfigModal, setShowAiConfigModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [cookingModeRecipe, setCookingModeRecipe] = useState(null);

  // Derive active recipe detail reactively
  const selectedRecipeDetail = recipes.find(r => r.id === selectedRecipeId) || null;

  // Supabase Auth Listener and initial sync
  useEffect(() => {
    const supabase = getSupabase();

    // Check initial user
    getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user);
        syncFromCloud(user.id);
      }
    });

    // Listen to login / logout / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      if (user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        syncFromCloud(user.id);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch & merge cloud data
  const syncFromCloud = async (userId) => {
    if (!userId) return;
    try {
      const cloudData = await fetchCloudUserData(userId);
      if (cloudData && Array.isArray(cloudData.recipes)) {
        // Merge cloud with current local
        const merged = mergeLocalAndCloudData(
          recipes,
          cookedHistory,
          cloudData.recipes,
          cloudData.userState?.cookedHistory
        );
        setDbState(merged);
        saveDatabaseState(merged.recipes, merged.userState);
        // Also push back merged result to cloud to keep in sync
        pushUserDataToCloud(userId, merged.recipes, merged.userState);
      } else {
        // First time cloud user: push local state to cloud
        pushUserDataToCloud(userId, recipes, { cookedHistory });
      }
    } catch (err) {
      console.warn('Cloud sync error:', err);
    }
  };

  // Save to persistent storage and cloud
  const updateDatabase = (newRecipes, newCookedHistory) => {
    const updatedRecipes = newRecipes !== undefined ? newRecipes : recipes;
    const updatedHistory = newCookedHistory !== undefined ? newCookedHistory : cookedHistory;

    const nextState = {
      recipes: updatedRecipes,
      userState: {
        ...(dbState.userState || {}),
        cookedHistory: updatedHistory
      }
    };

    setDbState(nextState);
    saveDatabaseState(updatedRecipes, nextState.userState);

    // Sync to Supabase in background if logged in
    if (currentUser?.id) {
      pushUserDataToCloud(currentUser.id, updatedRecipes, nextState.userState);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (recipeId) => {
    const updatedRecipes = recipes.map(r => {
      if (r.id === recipeId) {
        return { ...r, isFavorite: !r.isFavorite };
      }
      return r;
    });
    updateDatabase(updatedRecipes);
  };

  // Toggle Like
  const handleToggleLike = (recipeId) => {
    const updatedRecipes = recipes.map(r => {
      if (r.id === recipeId) {
        const nextLiked = !r.isLiked;
        return {
          ...r,
          isLiked: nextLiked,
          likes: nextLiked ? (r.likes || 0) + 1 : Math.max(0, (r.likes || 1) - 1)
        };
      }
      return r;
    });
    updateDatabase(updatedRecipes);
  };

  // Log Cooked History
  const handleLogCooked = (recipe, photoUrl = null) => {
    const logItem = {
      id: recipe.id || Date.now().toString(),
      title: recipe.title,
      coverImage: photoUrl || recipe.coverImage,
      cookTime: recipe.cookTime,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    };

    const newHistory = [logItem, ...cookedHistory];
    updateDatabase(undefined, newHistory);
  };

  // Add Custom / AI Parsed Recipe
  const handleAddRecipe = (newRecipe) => {
    const recipeToAdd = {
      ...newRecipe,
      likes: 0,
      isLiked: false,
      isFavorite: true // newly added recipes are auto-favorited
    };
    const updated = [recipeToAdd, ...recipes];
    updateDatabase(updated);
  };

  // Reset entire database to zero
  const handleResetData = () => {
    if (window.confirm('⚠️ 确定要将所有做饭记录和数据清零吗？此操作将重置为初始干净状态。')) {
      try {
        localStorage.removeItem('cookoo_universal_db_v1');
      } catch (e) {}
      const clean = loadDatabaseState();
      setDbState(clean);
      if (currentUser?.id) {
        pushUserDataToCloud(currentUser.id, clean.recipes, clean.userState);
      }
      alert('✨ 数据已全部清零，重新开始自炊生活！');
    }
  };

  // Export JSON Database
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ userState: { cookedHistory }, recipes }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cookoo_recipes_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Sign out handler
  const handleSignOut = async () => {
    if (window.confirm('确定要退出当前账号吗？（本地数据依然保留）')) {
      await signOutUser();
      setCurrentUser(null);
    }
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
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onNavigateMeal={(mealKey) => setActiveMealCategory(mealKey)}
              onOpenInspiration={() => setShowInspirationModal(true)}
              onOpenFridge={() => setShowFridgeModal(true)}
              onOpenInduction={() => setShowInductionModal(true)}
              onNavigateDiscover={() => setActiveTab('discover')}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverView
              recipes={recipes}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              recipes={recipes}
              cookedHistory={cookedHistory}
              currentUser={currentUser}
              onSelectRecipe={(r) => setSelectedRecipeId(r.id)}
              onExportData={handleExportData}
              onResetData={handleResetData}
              onOpenAiConfig={() => setShowAiConfigModal(true)}
              onOpenAuthModal={() => setShowAuthModal(true)}
              onSignOut={handleSignOut}
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
          onClose={() => setShowAddRecipeModal(false)}
          onAddRecipe={handleAddRecipe}
        />
      )}

      {showAiConfigModal && (
        <AiConfigModal
          onClose={() => setShowAiConfigModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            syncFromCloud(user.id);
          }}
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
