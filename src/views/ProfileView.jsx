import React, { useState } from 'react';
import { Settings, Award, Bookmark, ChefHat, Database, Download, RefreshCw, ChevronRight, Star, Utensils, Sparkles } from 'lucide-react';

export default function ProfileView({
  recipes = [],
  cookedHistory = [],
  onSelectRecipe,
  onExportData,
  onResetData,
  onOpenAiConfig
}) {
  const [activeSubTab, setActiveSubTab] = useState('favorites'); // 'favorites' or 'history'

  const favorites = recipes.filter(r => r.isFavorite);
  const totalCount = recipes.length || 1;
  const historySafe = Array.isArray(cookedHistory) ? cookedHistory : [];
  const uniqueCookedIds = new Set(historySafe.map(item => item?.id || item?.title || Math.random()));
  const uniqueCookedCount = uniqueCookedIds.size;

  const getChefLevel = (count) => {
    if (count === 0) return { title: '🌱 自炊萌新', desc: '做一道菜点亮你的首张勋章' };
    if (count < 3) return { title: '🍳 一人食探索者', desc: '自炊渐入佳境，继续加油！' };
    if (count < 8) return { title: '🥢 租房小厨神', desc: '电磁炉电饭煲炉火纯青' };
    return { title: '👑 满级掌勺大师', desc: '今天也是好好吃饭的一天！' };
  };

  const chefBadge = getChefLevel(historySafe.length);

  return (
    <div style={{ paddingBottom: 90 }}>
      
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          🍳
        </div>
        <div className="profile-name">
          美食探索者
        </div>
        <div className="profile-title">
          {chefBadge.title} · 独立自炊生活
        </div>
      </div>

      {/* User Stats Card */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{historySafe.length}</div>
          <div className="stat-label">自炊打卡 (顿)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{uniqueCookedCount}</div>
          <div className="stat-label">点亮菜品 (道)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{favorites.length}</div>
          <div className="stat-label">心仪收藏 (道)</div>
        </div>
      </div>

      {/* Segmented Control */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', background: '#F4EBE0', borderRadius: 14, padding: 3, gap: 4 }}>
          <button
            type="button"
            onClick={() => setActiveSubTab('favorites')}
            style={{
              flex: 1,
              border: 'none',
              background: activeSubTab === 'favorites' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'favorites' ? '#FF7417' : '#7A6A5D',
              fontWeight: activeSubTab === 'favorites' ? 800 : 600,
              fontSize: 13,
              padding: '8px 0',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Star size={14} fill={activeSubTab === 'favorites' ? '#FF7417' : 'none'} />
            我的收藏 ({favorites.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('history')}
            style={{
              flex: 1,
              border: 'none',
              background: activeSubTab === 'history' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'history' ? '#FF7417' : '#7A6A5D',
              fontWeight: activeSubTab === 'history' ? 800 : 600,
              fontSize: 13,
              padding: '8px 0',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Utensils size={14} />
            做菜记录 ({historySafe.length})
          </button>
        </div>
      </div>

      {/* SubTab Content */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        {activeSubTab === 'favorites' ? (
          favorites.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {favorites.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #F3E6D8',
                    borderRadius: 14,
                    padding: 10,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <img src={recipe.coverImage} alt={recipe.title} style={{ width: 54, height: 54, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>{recipe.title}</div>
                    <div style={{ fontSize: 11, color: '#7A6A5D' }}>{recipe.cookTime} · {recipe.calories}</div>
                  </div>
                  <Star size={16} fill="#FFB300" color="#FFB300" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px dashed #F3E6D8',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              color: '#A39386'
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>⭐</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#3D2C20' }}>暂无收藏菜谱</div>
              <div style={{ fontSize: 11, color: '#7A6A5D', marginTop: 2 }}>
                在发现页中点亮小黄星，随时珍藏心仪美食
              </div>
            </div>
          )
        ) : (
          historySafe.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {historySafe.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectRecipe(item)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #F3E6D8',
                    borderRadius: 14,
                    padding: 10,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <img src={item.coverImage} alt={item.title} style={{ width: 54, height: 54, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#7A6A5D' }}>{item.cookTime} · 打卡成果</div>
                  </div>
                  <Utensils size={16} color="#FF7417" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px dashed #F3E6D8',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              color: '#A39386'
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🍳</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#3D2C20' }}>暂无做菜记录</div>
              <div style={{ fontSize: 11, color: '#7A6A5D', marginTop: 2 }}>
                做完一道菜后，点击“记录做过”点亮你的美食勋章
              </div>
            </div>
          )
        )}
      </div>

      {/* Settings & Local Database Management */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20', marginBottom: 8 }}>
          AI 接口与数据管理
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #F3E6D8', borderRadius: 16, overflow: 'hidden' }}>
          
          <div 
            onClick={onOpenAiConfig}
            style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F3E6D8' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#3D2C20' }}>
              <Sparkles size={18} color="#FF7417" /> 配置 AI 大模型密钥 (DeepSeek / Kimi / Qwen)
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div 
            onClick={onExportData}
            style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F3E6D8' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#3D2C20' }}>
              <Download size={18} color="#FF7417" /> 导出/备份我的美食数据库 (JSON)
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div 
            onClick={onResetData}
            style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F3E6D8' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#E65100' }}>
              <RefreshCw size={18} color="#E65100" /> 一键全部清零（从零开始）
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#3D2C20' }}>
              <Database size={18} color="#4CAF50" /> 本地独立文件数据库 (零Cookie存储)
            </div>
            <span style={{ fontSize: 12, color: '#4CAF50', fontWeight: 700 }}>● 自动持久化</span>
          </div>
        </div>
      </div>
    </div>
  );
}
