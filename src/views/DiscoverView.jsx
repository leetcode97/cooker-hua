import React, { useState } from 'react';
import { Clock, Heart, ChevronRight } from 'lucide-react';
import { POPULAR_TAGS } from '../data/recipes';

export default function DiscoverView({ recipes, searchQuery, onSelectRecipe, onToggleLike }) {
  const [selectedTag, setSelectedTag] = useState('全部');
  const [sortTab, setSortTab] = useState('recommend'); // recommend, latest, hottest

  // Filtering & Sorting
  let filtered = recipes.filter(r => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.subtitle.toLowerCase().includes(q);
      const matchTags = r.tags.some(t => t.toLowerCase().includes(q));
      const matchIngs = r.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags && !matchIngs) return false;
    }

    // Tag filter
    if (selectedTag !== '全部') {
      if (!r.tags.includes(selectedTag)) return false;
    }

    return true;
  });

  // Sorting
  if (sortTab === 'hottest') {
    filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  } else if (sortTab === 'latest') {
    filtered = [...filtered].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header Title */}
      <div style={{ textAlign: 'center', padding: '8px 0 12px', fontSize: 18, fontWeight: 800, color: '#3D2C20' }}>
        发现
      </div>

      <div className="discover-header-section">
        {/* Popular Tags Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20' }}>热门标签</div>
          <div style={{ fontSize: 12, color: '#7A6A5D', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            全部标签 <ChevronRight size={14} />
          </div>
        </div>

        <div className="tags-scroll-container">
          <button
            className={`filter-tag-btn ${selectedTag === '全部' ? 'active' : ''}`}
            onClick={() => setSelectedTag('全部')}
          >
            全部
          </button>
          {POPULAR_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-tag-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sub Tabs (推荐, 最新, 最热) */}
        <div className="sub-tabs-row">
          <div 
            className={`sub-tab-item ${sortTab === 'recommend' ? 'active' : ''}`}
            onClick={() => setSortTab('recommend')}
          >
            推荐
          </div>
          <div 
            className={`sub-tab-item ${sortTab === 'latest' ? 'active' : ''}`}
            onClick={() => setSortTab('latest')}
          >
            最新
          </div>
          <div 
            className={`sub-tab-item ${sortTab === 'hottest' ? 'active' : ''}`}
            onClick={() => setSortTab('hottest')}
          >
            最热
          </div>
        </div>
      </div>

      {/* Recipes 2-column Grid */}
      <div className="recipes-grid">
        {filtered.map(recipe => (
          <div 
            key={recipe.id} 
            className="recipe-card-v2"
            onClick={() => onSelectRecipe(recipe)}
          >
            <div className="card-v2-img-box">
              <img src={recipe.coverImage} alt={recipe.title} />
              <div className="time-overlay-tag">
                <Clock size={10} /> {recipe.cookTime}
              </div>
            </div>
            <div className="card-v2-body">
              <div className="card-v2-title">{recipe.title}</div>
              <div className="card-v2-snippet">{recipe.subtitle}</div>
              <div className="card-v2-tags">
                {recipe.tags.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="tag-chip">{t}</span>
                ))}
              </div>
              <div className="card-v2-footer">
                <span className="card-v2-kcal">{recipe.calories}</span>
                <div 
                  className="card-v2-likes"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(recipe.id);
                  }}
                >
                  <Heart 
                    size={14} 
                    color={recipe.isLiked ? '#FF4D4F' : '#A39386'} 
                    fill={recipe.isLiked ? '#FF4D4F' : 'none'} 
                  />
                  <span>{recipe.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
