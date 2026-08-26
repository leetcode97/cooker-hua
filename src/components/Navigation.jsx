import React from 'react';
import { Home, Compass, Plus, Calendar, User, BookOpen } from 'lucide-react';

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  onTabChange, 
  onOpenAddRecipe 
}) {
  const handleSelectTab = (tabName) => {
    if (onTabChange) {
      onTabChange(tabName);
    } else if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  return (
    <nav className="bottom-nav-container">
      <div 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleSelectTab('home')}
      >
        <Home size={22} />
        <span>首页</span>
      </div>

      <div 
        className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
        onClick={() => handleSelectTab('discover')}
      >
        <BookOpen size={22} />
        <span>菜单</span>
      </div>

      <div 
        className="nav-add-btn" 
        onClick={onOpenAddRecipe}
        title="发布/新增菜谱"
      >
        <Plus size={28} strokeWidth={2.5} />
      </div>

      <div 
        className={`nav-item ${activeTab === 'journal' ? 'active' : ''}`}
        onClick={() => handleSelectTab('journal')}
      >
        <Calendar size={22} />
        <span>记录</span>
      </div>

      <div 
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleSelectTab('profile')}
      >
        <User size={22} />
        <span>我的</span>
      </div>
    </nav>
  );
}
