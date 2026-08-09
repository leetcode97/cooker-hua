import React from 'react';
import { Search, MoreHorizontal, Circle } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSearchSubmit, onOpenPoints }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-section">
          <div className="mascot-avatar" title="Cookoo 猫厨神">
            🐱‍🍳
          </div>
          <div className="brand-titles">
            <div className="brand-name">
              Cookoo 食光记
            </div>
            <div className="brand-motto">
              记录每一餐 · 热爱生活 · 好好吃饭
            </div>
          </div>
        </div>

        {/* Mini Program style capsule */}
        <div className="mini-capsule">
          <button className="capsule-btn" title="更多">
            <MoreHorizontal size={16} />
          </button>
          <div className="capsule-divider"></div>
          <button className="capsule-btn" title="小程序">
            <Circle size={12} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <form 
        className="search-container" 
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit && onSearchSubmit(searchQuery);
        }}
      >
        <Search size={16} style={{ color: '#A39386', marginRight: 8 }} />
        <input
          type="text"
          className="search-input"
          placeholder="搜索菜谱、食材、菜系..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          搜索
        </button>
      </form>
    </header>
  );
}
