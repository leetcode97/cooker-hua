import React from 'react';
import { Home, Compass, Plus, Calendar, User } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, onOpenAddRecipe }) {
  return (
    <nav className="bottom-nav-container">
      <div 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <Home size={22} />
        <span>首页</span>
      </div>

      <div 
        className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
        onClick={() => setActiveTab('discover')}
      >
        <Compass size={22} />
        <span>发现</span>
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
        onClick={() => setActiveTab('journal')}
      >
        <Calendar size={22} />
        <span>记录</span>
      </div>

      <div 
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
      >
        <User size={22} />
        <span>我的</span>
      </div>
    </nav>
  );
}
