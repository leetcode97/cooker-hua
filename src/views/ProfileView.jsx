import React, { useState } from 'react';
import { Settings, Award, Bookmark, ChefHat, Database, Download, RefreshCw, ChevronRight, Star, Utensils, Sparkles, Heart, Flame, Cloud, ShieldCheck, User, Link2, Copy, Trash2 } from 'lucide-react';

export default function ProfileView({
  recipes = [],
  cookedHistory = [],
  onSelectRecipe,
  onExportData,
  onResetData,
  onOpenAiConfig,
  onOpenSyncCodeModal,
  onDeleteHistoryItem,
  onToggleFavorite
}) {
  const [activeSubTab, setActiveSubTab] = useState('favorites'); // 'favorites' or 'history'

  const favorites = recipes.filter(r => r.isFavorite);
  const rawHistory = Array.isArray(cookedHistory) ? cookedHistory : [];
  
  // 全局去重展示：保留最新一次打卡记录
  const uniqueHistoryMap = new Map();
  rawHistory.forEach(item => {
    if (!uniqueHistoryMap.has(item.id)) {
      uniqueHistoryMap.set(item.id, item);
    }
  });
  const historySafe = Array.from(uniqueHistoryMap.values());
  const uniqueCookedIds = new Set(historySafe.map(item => item?.id || item?.title || Math.random()));
  const uniqueCookedCount = uniqueCookedIds.size;

  const getChefLevel = (count) => {
    if (count === 0) return { title: '🌱 自炊萌新', desc: '做一道菜点亮你的首张勋章', color: '#4CAF50', bg: '#E8F5E9' };
    if (count < 3) return { title: '🍳 一人食探索者', desc: '自炊渐入佳境，继续加油！', color: '#FF7417', bg: '#FFF0E5' };
    if (count < 8) return { title: '🥢 租房小厨神', desc: '电磁炉电饭煲炉火纯青', color: '#E65100', bg: '#FFE0B2' };
    return { title: '👑 满级掌勺大师', desc: '今天也是好好吃饭的一天！', color: '#FFB300', bg: '#FFF8E1' };
  };

  const chefBadge = getChefLevel(historySafe.length);

  return (
    <div style={{ paddingBottom: 90, paddingLeft: 16, paddingRight: 16 }}>
      
      {/* 🌟 1. 顶部大厨卡片 */}
      <div style={{
        marginTop: 12,
        marginBottom: 12,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
        border: '1.5px solid #F6DFCB',
        borderRadius: 24,
        padding: '18px 16px',
        boxShadow: '0 8px 24px rgba(230, 100, 20, 0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }}>
        {/* Avatar */}
        <div style={{
          position: 'relative',
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
          border: '2.5px solid #FFFFFF',
          boxShadow: '0 4px 12px rgba(255, 116, 23, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0
        }}>
          🍳
          <div style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#FF7417',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 900,
            border: '2px solid white'
          }}>
            ✓
          </div>
        </div>

        {/* User Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 900, color: '#3D2C20' }}>
              美食探索者
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: chefBadge.color,
              background: chefBadge.bg,
              padding: '2px 6px',
              borderRadius: 10,
              border: `1px solid ${chefBadge.color}33`
            }}>
              {chefBadge.title}
            </span>
            <span style={{ fontSize: 11, color: '#9C6F4B' }}>
              好好吃饭 · 热爱生活
            </span>
          </div>
        </div>
      </div>


      {/* 📊 3. 三大核心数据统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 18
      }}>
        {/* Card 1: 打卡顿数 */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #F3E6D8',
          borderRadius: 18,
          padding: '12px 8px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#FF7417', lineHeight: 1.2 }}>
            {historySafe.length}
          </div>
          <div style={{ fontSize: 11, color: '#8D6E63', fontWeight: 600, marginTop: 4 }}>
            自炊打卡 (顿)
          </div>
        </div>

        {/* Card 2: 已点亮菜品 */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #F3E6D8',
          borderRadius: 18,
          padding: '12px 8px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#2E7D32', lineHeight: 1.2 }}>
            {uniqueCookedCount}
          </div>
          <div style={{ fontSize: 11, color: '#8D6E63', fontWeight: 600, marginTop: 4 }}>
            点亮菜品 (道)
          </div>
        </div>

        {/* Card 3: 收藏菜谱 */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #F3E6D8',
          borderRadius: 18,
          padding: '12px 8px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#E91E63', lineHeight: 1.2 }}>
            {favorites.length}
          </div>
          <div style={{ fontSize: 11, color: '#8D6E63', fontWeight: 600, marginTop: 4 }}>
            心仪收藏 (道)
          </div>
        </div>
      </div>

      {/* 📑 4. 标签切换器 */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', background: '#F2E8DC', borderRadius: 16, padding: 4, gap: 4 }}>
          <button
            type="button"
            onClick={() => setActiveSubTab('favorites')}
            style={{
              flex: 1,
              border: 'none',
              background: activeSubTab === 'favorites' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'favorites' ? '#FF7417' : '#8D6E63',
              fontWeight: activeSubTab === 'favorites' ? 800 : 600,
              fontSize: 13,
              padding: '9px 0',
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: activeSubTab === 'favorites' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Star size={15} fill={activeSubTab === 'favorites' ? '#FF7417' : 'none'} color={activeSubTab === 'favorites' ? '#FF7417' : '#8D6E63'} />
            我的收藏 ({favorites.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('history')}
            style={{
              flex: 1,
              border: 'none',
              background: activeSubTab === 'history' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'history' ? '#FF7417' : '#8D6E63',
              fontWeight: activeSubTab === 'history' ? 800 : 600,
              fontSize: 13,
              padding: '9px 0',
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: activeSubTab === 'history' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Utensils size={15} color={activeSubTab === 'history' ? '#FF7417' : '#8D6E63'} />
            做菜记录 ({historySafe.length})
          </button>
        </div>
      </div>

      {/* 🍱 5. 列表内容区域 */}
      <div style={{ marginBottom: 24 }}>
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
                    borderRadius: 16,
                    padding: 10,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <img src={recipe.coverImage} alt={recipe.title} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20' }}>{recipe.title}</div>
                    <div style={{ fontSize: 11, color: '#8D6E63', marginTop: 2 }}>{recipe.cookTime} · {recipe.calories}</div>
                  </div>
                  <div 
                    title="取消收藏"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite && onToggleFavorite(recipe.id);
                    }}
                    style={{ padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <Star size={20} fill="#FFB300" color="#FFB300" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px dashed #F3E6D8',
              borderRadius: 20,
              padding: '28px 20px',
              textAlign: 'center',
              color: '#A39386'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⭐</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>暂无收藏菜谱</div>
              <div style={{ fontSize: 12, color: '#8D6E63', marginTop: 4 }}>
                在发现页点亮小黄星，随时珍藏你最爱的一人食！
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
                    borderRadius: 16,
                    padding: 10,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <img src={item.coverImage} alt={item.title} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#8D6E63', marginTop: 2 }}>{item.cookTime} · 打卡成果</div>
                  </div>
                  {onDeleteHistoryItem ? (
                    <button
                      type="button"
                      title="删除此笔打卡记录"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`确定删除“${item.title}”的打卡记录吗？`)) {
                          onDeleteHistoryItem(item.id || item.timestamp);
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#E57373',
                        padding: 6,
                        cursor: 'pointer',
                        borderRadius: 8
                      }}
                    >
                      <Trash2 size={16} color="#E57373" />
                    </button>
                  ) : (
                    <Utensils size={18} color="#FF7417" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px dashed #F3E6D8',
              borderRadius: 20,
              padding: '28px 20px',
              textAlign: 'center',
              color: '#A39386'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🍳</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>暂无做菜打卡记录</div>
              <div style={{ fontSize: 12, color: '#8D6E63', marginTop: 4 }}>
                做完一道菜后，点击“记录做过”点亮你的专属大厨勋章！
              </div>
            </div>
          )
        )}
      </div>

      {/* ⚙️ 6. 系统与 AI 设置 */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20', marginBottom: 10 }}>
          ⚙️ 系统设置与数据管理
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #F3E6D8', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          
          <div 
            onClick={onOpenSyncCodeModal}
            style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F6EBE0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FFF0E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link2 size={16} color="#FF7417" />
              </div>
              配对其他设备 (手机/电脑多端同步)
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div 
            onClick={onOpenAiConfig}
            style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F6EBE0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color="#FF7417" />
              </div>
              配置 AI 大模型密钥 (DeepSeek / Kimi / Qwen)
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div 
            onClick={onExportData}
            style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F6EBE0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={16} color="#1976D2" />
              </div>
              导出 / 备份我的美食数据库 (JSON)
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div 
            onClick={onResetData}
            style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #F6EBE0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#E65100' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FBE9E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={16} color="#E65100" />
              </div>
              一键全部清零（从零开始）
            </div>
            <ChevronRight size={16} color="#A39386" />
          </div>

          <div style={{ padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: '#3D2C20' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database size={16} color="#4CAF50" />
              </div>
              免登录 · 云端 365 天永不休眠
            </div>
            <span style={{ fontSize: 11, color: '#2E7D32', background: '#E8F5E9', padding: '2px 8px', borderRadius: 8, fontWeight: 700 }}>
              ● 24H 实时通电
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
