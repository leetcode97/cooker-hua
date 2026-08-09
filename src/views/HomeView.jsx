import React from 'react';
import { ChevronRight, Star, Heart, Clock, Zap, Flame } from 'lucide-react';

export default function HomeView({
  recipes = [],
  cookedHistory = [],
  onOpenMealCategory,
  onOpenFridge,
  onOpenAiOrganizer,
  onNavigateJournal,
  onSelectRecipe,
  onToggleFavorite,
  onNavigateDiscover
}) {
  // Current hour for smart meal highlighting
  const currentHour = new Date().getHours();
  const isBreakfastTime = currentHour >= 5 && currentHour < 11;
  const isLunchTime = currentHour >= 11 && currentHour < 15;
  const isDinnerTime = currentHour >= 17 && currentHour < 22;
  const isNightTime = currentHour >= 22 || currentHour < 5;

  // Recently favorited recipes
  const favoritedRecipes = recipes.filter(r => r.isFavorite);
  
  // Popular recipes preview
  const popularRecipes = recipes.slice(0, 6);

  // Safe compute of Cook Achievements
  const historySafe = Array.isArray(cookedHistory) ? cookedHistory : [];
  const uniqueCookedIds = new Set(historySafe.map(item => item?.id || item?.title || Math.random()));
  const uniqueCookedCount = uniqueCookedIds.size;
  const totalCount = recipes.length || 1;
  const progressPercent = Math.min(100, Math.round((uniqueCookedCount / totalCount) * 100));

  // Achievement Badge Level
  const getChefLevel = (count) => {
    if (count === 0) return { title: '🌱 自炊萌新', desc: '做一道菜点亮你的首张勋章' };
    if (count < 3) return { title: '🍳 一人食探索者', desc: '自炊渐入佳境，继续加油！' };
    if (count < 8) return { title: '🥢 租房小厨神', desc: '电磁炉电饭煲炉火纯青' };
    return { title: '👑 满级掌勺大师', desc: '今天也是好好吃饭的一天！' };
  };

  const chefBadge = getChefLevel(historySafe.length);

  const mealCards = [
    {
      type: 'breakfast',
      title: '🌅 早餐专区',
      sub: '3~7分极速醒神',
      highlight: isBreakfastTime,
      bg: 'linear-gradient(135deg, #FFF4E5 0%, #FFE0B2 100%)',
      border: '#FFE082'
    },
    {
      type: 'lunch',
      title: '☀️ 能量午餐',
      sub: '一锅端饱腹不犯困',
      highlight: isLunchTime,
      bg: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
      border: '#FFD54F'
    },
    {
      type: 'dinner',
      title: '🌙 治愈晚餐',
      sub: '暖心焖煲卸下疲惫',
      highlight: isDinnerTime,
      bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
      border: '#CE93D8'
    },
    {
      type: 'night',
      title: '🌌 深夜食堂',
      sub: '5分幸福深夜慰藉',
      highlight: isNightTime,
      bg: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
      border: '#B39DDB'
    }
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      
      {/* 🏆 自炊生活成长成就卡片 */}
      <div 
        onClick={onNavigateJournal}
        style={{
          margin: '12px 20px 16px',
          background: 'linear-gradient(135deg, #FFF7F0 0%, #FFF0E1 100%)',
          border: '1.5px solid #F8D8BE',
          borderRadius: 20,
          padding: '14px 16px',
          boxShadow: '0 4px 14px rgba(230, 100, 20, 0.08)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18 }}>🎖️</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#3D2C20' }}>
              {chefBadge.title}
            </span>
            <span style={{ fontSize: 11, color: '#9C6F4B', background: '#FFE7D2', padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>
              打卡 {historySafe.length} 顿
            </span>
          </div>

          <div style={{ fontSize: 11, color: '#FF7417', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
            美食日记 <ChevronRight size={14} />
          </div>
        </div>

        {/* Cooking progress tracker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#6D4C41', marginBottom: 6 }}>
          <span>🍳 已点亮 <b style={{ color: '#FF7417' }}>{historySafe.length > 0 ? uniqueCookedCount : 0}</b> / {totalCount} 道家常菜</span>
          <span style={{ fontSize: 11, color: '#9C6F4B' }}>{chefBadge.desc}</span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: 6,
          background: 'rgba(255, 116, 23, 0.15)',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${Math.max(5, progressPercent)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFA726 0%, #FF7417 100%)',
            borderRadius: 4,
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* 4 Primary Meal Cards (早餐 / 午餐 / 晚餐 / 夜宵) */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#3D2C20', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>🍽️ 今天吃什么 · 按餐选菜</span>
          <span style={{ fontSize: 11, color: '#FF7417', fontWeight: 600 }}>
            {isBreakfastTime ? '⏰ 正值早餐时光' : isLunchTime ? '⏰ 正值午餐时光' : isDinnerTime ? '⏰ 正值晚餐时光' : '⏰ 深夜食堂营业中'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {mealCards.map(c => (
            <div
              key={c.type}
              onClick={() => onOpenMealCategory(c.type)}
              style={{
                background: c.bg,
                border: `1.5px solid ${c.highlight ? '#FF7417' : c.border}`,
                borderRadius: 18,
                padding: '14px 12px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: c.highlight ? '0 6px 16px rgba(255, 116, 23, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              {c.highlight && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 8,
                  fontSize: 9,
                  background: '#FF7417',
                  color: 'white',
                  padding: '1px 5px',
                  borderRadius: 6,
                  fontWeight: 800
                }}>
                  当下推荐
                </span>
              )}
              <div style={{ fontSize: 16, fontWeight: 800, color: '#3D2C20' }}>
                {c.title}
              </div>
              <div style={{ fontSize: 11, color: '#6D4C41', marginTop: 3 }}>
                {c.sub}
              </div>
              <div style={{ fontSize: 11, color: '#FF7417', fontWeight: 700, marginTop: 8, display: 'flex', alignItems: 'center', gap: 2 }}>
                抽灵感卡 &gt;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tools Grid (2 Cards) */}
      <div className="quick-tools-grid" style={{ marginBottom: 16 }}>
        <div className="tool-card" onClick={onOpenAiOrganizer}>
          <div className="tool-icon-wrapper">
            📖
          </div>
          <div className="tool-title">帮我整理菜谱</div>
          <div className="tool-desc">粘贴图文自由归类餐型</div>
        </div>

        <div className="tool-card" onClick={onOpenFridge}>
          <div className="tool-icon-wrapper">
            🧺
          </div>
          <div className="tool-title">家里有什么</div>
          <div className="tool-desc">按已有食材匹配与搜寻</div>
        </div>
      </div>

      {/* Section 1: 最近收藏 */}
      <div className="section-header">
        <div className="section-title">我的收藏</div>
        <div className="section-more" onClick={onNavigateDiscover}>
          全部 <ChevronRight size={16} />
        </div>
      </div>

      <div className="horizontal-recipes-scroll">
        {favoritedRecipes.length > 0 ? (
          favoritedRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="horiz-recipe-card"
              onClick={() => onSelectRecipe(recipe)}
            >
              <div className="horiz-img-wrapper">
                <img src={recipe.coverImage} alt={recipe.title} />
                <div 
                  className="fav-star-badge"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe.id);
                  }}
                >
                  <Star size={12} fill="#FFB300" color="#FFB300" />
                </div>
              </div>
              <div className="horiz-card-body">
                <div className="horiz-card-title">{recipe.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <span className="horiz-card-time">{recipe.cookTime}</span>
                  {recipe.inductionFriendly && (
                    <span style={{ fontSize: 9, background: '#FFF0E5', color: '#FF7417', padding: '1px 4px', borderRadius: 4, fontWeight: 700 }}>
                      ⚡ 电磁炉
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '16px 20px', color: '#A39386', fontSize: 13, background: '#FFFFFF', borderRadius: 14, margin: '0 20px 12px', border: '1px dashed #F3E6D8', textAlign: 'center' }}>
            点亮菜谱上的小黄星，即可在此快速找到！
          </div>
        )}
      </div>

      {/* Section 2: 热门精选菜谱 */}
      <div className="section-header" style={{ marginTop: 12 }}>
        <div className="section-title">🔥 热门精选</div>
        <div className="section-more" onClick={onNavigateDiscover}>
          全部 <ChevronRight size={16} />
        </div>
      </div>

      <div className="recipes-grid">
        {popularRecipes.map(recipe => (
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
                {recipe.inductionFriendly && (
                  <span className="tag-chip" style={{ background: '#FFF3E0', color: '#E65100', fontWeight: 700 }}>
                    ⚡ 电磁炉
                  </span>
                )}
                {recipe.riceCookerFriendly && (
                  <span className="tag-chip" style={{ background: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }}>
                    🍚 电饭煲
                  </span>
                )}
              </div>
              <div className="card-v2-footer">
                <span className="card-v2-kcal">{recipe.calories}</span>
                <div className="card-v2-likes">
                  <Heart size={14} color={recipe.isLiked ? '#FF4D4F' : '#A39386'} fill={recipe.isLiked ? '#FF4D4F' : 'none'} />
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
