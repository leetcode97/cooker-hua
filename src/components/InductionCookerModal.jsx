import React, { useState } from 'react';
import { X, Zap, Flame, Clock, ChefHat, CheckCircle2, AlertCircle, ArrowRight, Search, PlayCircle } from 'lucide-react';

export default function InductionCookerModal({ recipes, onClose, onSelectRecipe, onOpenCookingMode }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchWord, setSearchWord] = useState('');

  // Filter only induction friendly recipes
  const inductionRecipes = recipes.filter(r => r.inductionFriendly !== false);

  const filteredList = inductionRecipes.filter(r => {
    if (searchWord.trim()) {
      const q = searchWord.toLowerCase();
      const matchT = r.title.toLowerCase().includes(q);
      const matchS = r.subtitle.toLowerCase().includes(q);
      const matchIng = r.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!matchT && !matchS && !matchIng) return false;
    }

    if (activeCategory === 'riceCooker') return r.riceCookerFriendly || r.tags.includes('电饭煲一锅出');
    if (activeCategory === 'quick') return r.tags.includes('10分钟快手') || r.minutes <= 15;
    if (activeCategory === 'onepot') return r.tags.includes('一锅端') || r.tags.includes('汤羹煲仔');
    if (activeCategory === 'tender') return r.tags.includes('嫩肉免高压') || r.tags.includes('肉类');
    if (activeCategory === 'steam') return r.tags.includes('无油烟蒸菜') || r.tags.includes('蒸菜');
    if (activeCategory === 'staple') return r.tags.includes('懒人主食') || r.tags.includes('方便面');
    return true;
  });

  return (
    <div className="modal-overlay" style={{ zIndex: 105 }} onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '94vh', maxHeight: '94vh' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header Bar */}
        <div className="modal-header-bar" style={{ background: 'linear-gradient(135deg, #FFF6EE 0%, #FFEEDD 100%)' }}>
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3D2C20' }}>
            <Zap size={22} color="#FF7417" fill="#FF7417" />
            ⚡ 电磁炉 / 电饭煲 懒人专区
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px 80px', overflowY: 'auto' }}>
          
          {/* Top Banner Guide for Induction / Rice Cooker Cooking */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #F6D6B9',
            borderRadius: 18,
            padding: 14,
            marginBottom: 14,
            boxShadow: '0 4px 14px rgba(255, 116, 23, 0.08)'
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <AlertCircle size={16} color="#FF7417" /> 告别高压锅与老火慢炖 · 租房极简指南
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, textAlign: 'center', marginBottom: 8 }}>
              <div style={{ background: '#FFF8F0', padding: '6px 4px', borderRadius: 10, border: '1px solid #F3E6D8' }}>
                <div style={{ fontSize: 14 }}>🍚</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#3D2C20' }}>电饭煲一锅出</div>
                <div style={{ fontSize: 9, color: '#7A6A5D' }}>一键煮饭键即熟</div>
              </div>
              <div style={{ background: '#FFF8F0', padding: '6px 4px', borderRadius: 10, border: '1px solid #F3E6D8' }}>
                <div style={{ fontSize: 14 }}>🍲</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#3D2C20' }}>薄肉/鱼虾/肉末</div>
                <div style={{ fontSize: 9, color: '#7A6A5D' }}>免炖2-5分速熟</div>
              </div>
              <div style={{ background: '#FFF8F0', padding: '6px 4px', borderRadius: 10, border: '1px solid #F3E6D8' }}>
                <div style={{ fontSize: 14 }}>♨️</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#3D2C20' }}>蒸锅/蒸格同蒸</div>
                <div style={{ fontSize: 9, color: '#7A6A5D' }}>8分钟无油烟</div>
              </div>
            </div>

            <div style={{ fontSize: 11, color: '#8D6E63', background: '#FAF5EE', padding: '5px 8px', borderRadius: 8 }}>
              💡 <strong>双模式支持:</strong> 进入菜谱详情可自由切换【⚡电磁炉版】与【🍚电饭煲懒人版】查看不同做法！
            </div>
          </div>

          {/* Quick Search within Induction Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            border: '1px solid #F3E6D8',
            borderRadius: 20,
            padding: '6px 12px',
            marginBottom: 12
          }}>
            <Search size={14} color="#A39386" style={{ marginRight: 6 }} />
            <input
              type="text"
              placeholder="搜索食材 (如: 肥牛、巴沙鱼、鸡腿排、电饭煲)..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: 12, background: 'transparent' }}
            />
          </div>

          {/* Cooking Category Pills */}
          <div className="tags-scroll-container" style={{ marginBottom: 14 }}>
            <button 
              className={`filter-tag-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              全部 ({inductionRecipes.length})
            </button>
            <button 
              className={`filter-tag-btn ${activeCategory === 'riceCooker' ? 'active' : ''}`}
              onClick={() => setActiveCategory('riceCooker')}
            >
              🍚 电饭煲一锅出
            </button>
            <button 
              className={`filter-tag-btn ${activeCategory === 'quick' ? 'active' : ''}`}
              onClick={() => setActiveCategory('quick')}
            >
              ⚡ 10分钟快手
            </button>
            <button 
              className={`filter-tag-btn ${activeCategory === 'onepot' ? 'active' : ''}`}
              onClick={() => setActiveCategory('onepot')}
            >
              🍲 懒人一锅端
            </button>
            <button 
              className={`filter-tag-btn ${activeCategory === 'tender' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tender')}
            >
              🥩 嫩肉免高压
            </button>
            <button 
              className={`filter-tag-btn ${activeCategory === 'steam' ? 'active' : ''}`}
              onClick={() => setActiveCategory('steam')}
            >
              ♨️ 无油烟蒸菜
            </button>
          </div>

          {/* Recipes List specially formatted for Induction Cooking */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredList.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => {
                  onSelectRecipe(recipe);
                  onClose();
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #F3E6D8',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(180, 120, 70, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', gap: 12, padding: 12 }}>
                  <img
                    src={recipe.coverImage}
                    alt={recipe.title}
                    style={{ width: 88, height: 88, borderRadius: 12, objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#3D2C20' }}>
                          {recipe.title}
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {recipe.riceCookerFriendly && (
                            <span style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: '#E65100',
                              background: '#FFF3E0',
                              padding: '2px 6px',
                              borderRadius: 10
                            }}>
                              🍚 电饭煲可用
                            </span>
                          )}
                          <span style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#FF7417',
                            background: '#FFF0E5',
                            padding: '2px 6px',
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                          }}>
                            <Zap size={10} /> 电磁炉
                          </span>
                        </div>
                      </div>

                      <div style={{ fontSize: 11, color: '#7A6A5D', margin: '4px 0', lineClamp: 1, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {recipe.subtitle}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#A39386' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Clock size={11} color="#FF7417" /> {recipe.cookTime}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Flame size={11} color="#FF7417" /> {recipe.calories}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCookingMode && onOpenCookingMode(recipe);
                          onClose();
                        }}
                        style={{
                          background: '#FFF0E5',
                          border: '1px solid #FF8C2B',
                          color: '#E65100',
                          borderRadius: 12,
                          padding: '2px 8px',
                          fontSize: 10,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          cursor: 'pointer'
                        }}
                      >
                        <PlayCircle size={12} /> 大字下厨
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rice Cooker Tip highlight */}
                {recipe.riceCookerTips && (
                  <div style={{
                    background: '#FFFBF6',
                    borderTop: '1px dashed #F3E6D8',
                    padding: '8px 12px',
                    fontSize: 11,
                    color: '#8D6E63',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>🍚</span>
                      <strong>电饭煲速做:</strong> {recipe.riceCookerTips.replace('🍚 ', '')}
                    </span>
                    <ArrowRight size={14} color="#A39386" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
