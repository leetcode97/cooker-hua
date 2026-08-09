import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeView from './views/HomeView';
import DiscoverView from './views/DiscoverView';
import JournalView from './views/JournalView';
import ProfileView from './views/ProfileView';
import MealCategoryView from './views/MealCategoryView';

import InspirationCardModal from './components/InspirationCardModal';
import FridgeHeroModal from './components/FridgeHeroModal';
import AiRecipeOrganizerModal from './components/AiRecipeOrganizerModal';
import InductionCookerModal from './components/InductionCookerModal';
import RecipeDetailModal from './components/RecipeDetailModal';
import CookingModeModal from './components/CookingModeModal';
import AddRecipeModal from './components/AddRecipeModal';
import AiConfigModal from './components/AiConfigModal';

import { DEFAULT_DATABASE } from './data/defaultDatabase';

const API_BASE = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';

export default function App() {
  const [recipes, setRecipes] = useState(DEFAULT_DATABASE.recipes);
  const [cookedHistory, setCookedHistory] = useState(DEFAULT_DATABASE.userState.cookedHistory || []);

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
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null);
  const [cookingModeRecipe, setCookingModeRecipe] = useState(null);

  // Load from local database file via API
  useEffect(() => {
    fetch(`${API_BASE}/db`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setRecipes(res.data.recipes || DEFAULT_DATABASE.recipes);
          setCookedHistory(res.data.userState?.cookedHistory || []);
        }
      })
      .catch(() => {});
  }, []);

  // Sync state changes to local database file
  const syncUserState = (newCookedHistory) => {
    fetch(`${API_BASE}/user-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cookedHistory: newCookedHistory })
    }).catch(() => {});
  };

  // Toggle Favorite
  const handleToggleFavorite = (recipeId) => {
    setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r));
    
    fetch(`${API_BASE}/recipes/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId })
    }).catch(() => {});
  };

  // Toggle Like
  const handleToggleLike = (recipeId) => {
    setRecipes(prev => prev.map(r => {
      if (r.id === recipeId) {
        const nextLiked = !r.isLiked;
        return { ...r, isLiked: nextLiked, likes: nextLiked ? r.likes + 1 : r.likes - 1 };
      }
      return r;
    }));

    fetch(`${API_BASE}/recipes/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId })
    }).catch(() => {});
  };

  // Log Cooked History (Real Milestone Achievement)
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
    setCookedHistory(newHistory);
    syncUserState(newHistory);
  };

  // Add Custom / AI Parsed Recipe
  const handleAddRecipe = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev]);

    fetch(`${API_BASE}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    }).catch(() => {});
  };

  // Reset entire database to zero
  const handleResetData = () => {
    if (window.confirm('⚠️ 确定要将所有做饭记录和数据清零吗？此操作将重置为初始干净状态。')) {
      fetch(`${API_BASE}/reset`, { method: 'POST' })
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data) {
            setRecipes(res.data.recipes);
            setCookedHistory([]);
            alert('✨ 数据已全部清零，重新开始自炊生活！');
          }
        })
        .catch(() => {
          alert('重置失败，请检查本地后台服务。');
        });
    }
  };

  // Export JSON Database
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ userState: { cookedHistory }, recipes }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cookoo_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="app-container">
      {/* Mobile Sticky Header */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddRecipe={() => setShowAddRecipeModal(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* If Active in a Specific Meal Category Subpage (Breakfast, Lunch, Dinner, Night) */}
        {activeMealCategory ? (
          <MealCategoryView
            mealType={activeMealCategory}
            recipes={recipes}
            onBack={() => setActiveMealCategory(null)}
            onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                recipes={recipes}
                cookedHistory={cookedHistory}
                onOpenMealCategory={(categoryKey) => setActiveMealCategory(categoryKey)}
                onOpenInspiration={() => setShowInspirationModal(true)}
                onOpenFridge={() => setShowFridgeModal(true)}
                onOpenAiOrganizer={() => setShowAiOrganizerModal(true)}
                onOpenInduction={() => setShowInductionModal(true)}
                onNavigateJournal={() => setActiveTab('journal')}
                onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
                onToggleFavorite={handleToggleFavorite}
                onNavigateDiscover={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverView
                recipes={recipes}
                searchQuery={searchQuery}
                onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
                onToggleFavorite={handleToggleFavorite}
                onOpenMealCategory={(categoryKey) => setActiveMealCategory(categoryKey)}
              />
            )}

            {activeTab === 'journal' && (
              <JournalView
                cookedHistory={cookedHistory}
                totalRecipes={recipes.length}
                onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
                onNavigateDiscover={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                recipes={recipes}
                cookedHistory={cookedHistory}
                onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
                onExportData={handleExportData}
                onResetData={handleResetData}
                onOpenAiConfig={() => setShowAiConfigModal(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveMealCategory(null);
          setActiveTab(tab);
        }}
      />

      {/* Modals */}
      {showInspirationModal && (
        <InspirationCardModal
          recipes={recipes}
          onClose={() => setShowInspirationModal(false)}
          onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
        />
      )}

      {showFridgeModal && (
        <FridgeHeroModal
          recipes={recipes}
          onClose={() => setShowFridgeModal(false)}
          onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
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
          onSelectRecipe={(r) => setSelectedRecipeDetail(r)}
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

      {selectedRecipeDetail && (
        <RecipeDetailModal
          recipe={selectedRecipeDetail}
          onClose={() => setSelectedRecipeDetail(null)}
          onToggleFavorite={handleToggleFavorite}
          onToggleLike={handleToggleLike}
          onLogCooked={handleLogCooked}
          onOpenCookingMode={(r) => {
            setSelectedRecipeDetail(null);
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
