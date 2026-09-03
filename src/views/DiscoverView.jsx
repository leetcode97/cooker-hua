import React, { useState } from 'react';
import { ChefHat, Search, Edit2, Trash2, Clock, Heart, ChevronRight } from 'lucide-react';

export default function DiscoverView({ recipes, onSelectRecipe, onEditRecipe, onDeleteRecipe, searchQuery, onSearchChange, onToggleFavorite, onToggleLike }) {
  const [selectedTag, setSelectedTag] = useState('全部');
  const [sortTab, setSortTab] = useState('latest'); // recommend, latest, hottest

  const DEFAULT_TAGS = ['家常菜', '快手菜', '减脂餐'];
  const allTags = Array.from(new Set([
    ...DEFAULT_TAGS,
    ...recipes.flatMap(r => r.tags || [])
  ]));

  // Filtering & Sorting
  let filtered = recipes.filter(r => {
    // Search query filter
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.subtitle.toLowerCase().includes(q);
      const matchTags = r.tags.some(t => t.toLowerCase().includes(q));
      const matchIngs = r.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags && !matchIngs) return false;
    }

    // Tag filter
    if (selectedTag !== '全部') {
      if (!r.tags.some(t => t.includes(selectedTag))) return false;
    }

    return true;
  });

  // Sorting
  if (sortTab === 'hottest') {
    filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  } else if (sortTab === 'latest') {
    filtered = [...filtered].sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));
  }

  return (
    <div style={{ paddingBottom: 90, minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ padding: '16px', background: 'white', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: '#3D2C20', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ChefHat color="#FF7417" />
          所有菜单 ({recipes.length})
        </h2>
        
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999' }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="搜索菜名或标签 (如: 极速, 电饭煲)..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: 16, border: '1px solid #eee', background: '#F9F9F9', fontSize: 14, outline: 'none', color: '#333' }}
          />
        </div>

        <div className="tags-scroll-container">
          <button
            className={`filter-tag-btn ${selectedTag === '全部' ? 'active' : ''}`}
            onClick={() => setSelectedTag('全部')}
          >
            全部
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-tag-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Recipes 2-column Grid */}
        {filtered.length > 0 ? (
          <div className="recipes-grid">
            {filtered.map(recipe => (
              <div 
                key={recipe.id} 
                className="recipe-card-v2"
                onClick={() => onSelectRecipe(recipe)}
                style={{ position: 'relative' }}
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
                    {(recipe.tags || []).map((t, idx) => (
                      <span key={idx} className="tag-chip">{t}</span>
                    ))}
                  </div>
                  
                  {/* Footer with Edit/Delete */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); onEditRecipe(recipe); }}
                        style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                      >
                        <Edit2 size={14} /> 编辑
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteRecipe(recipe.id); }}
                        style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: '#FF3B30', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                      >
                        <Trash2 size={14} /> 删除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            没有找到相关的菜谱呢...
          </div>
        )}
      </div>
    </div>
  );
}
