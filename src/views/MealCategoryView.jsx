import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, CheckCircle, Clock, Flame, Zap, ChevronRight, Dices } from 'lucide-react';
import confetti from 'canvas-confetti';

const MEAL_CONFIG = {
  breakfast: {
    title: '🌅 元气早餐专区',
    subtitle: '3~7分钟快速补能 · 唤醒活力一天',
    drawTitle: '抽一张早餐灵感卡',
    categoryName: '早餐',
    bannerGradient: 'linear-gradient(135deg, #FFF4E5 0%, #FFE0B2 100%)',
    borderCol: '#FFE082',
    icon: '🌅',
    tags: ['全部', '⚡ 5分钟极速', '吐司主食', '温暖汤粥', '平底锅快炒']
  },
  lunch: {
    title: '☀️ 能量午餐专区',
    subtitle: '荤素搭配 · 饱腹主食一锅出 · 充能一下午',
    drawTitle: '抽一张午餐灵感卡',
    categoryName: '午餐',
    bannerGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
    borderCol: '#FFD54F',
    icon: '☀️',
    tags: ['全部', '一锅端', '平底锅快炒', '电饭煲一锅出', '懒人主食']
  },
  dinner: {
    title: '🌙 治愈晚餐专区',
    subtitle: '卸下一天疲惫 · 暖心焖锅与轻负担美味',
    drawTitle: '抽一张晚餐灵感卡',
    categoryName: '晚餐',
    bannerGradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    borderCol: '#CE93D8',
    icon: '🌙',
    tags: ['全部', '一锅端', '无油烟蒸菜', '减脂餐', '酸辣']
  },
  night: {
    title: '🌌 深夜食堂专区',
    subtitle: '深夜慰藉 · 5~8分钟热腾腾幸福感',
    drawTitle: '抽一张夜宵灵感卡',
    categoryName: '夜宵',
    bannerGradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
    borderCol: '#B39DDB',
    icon: '🌌',
    tags: ['全部', '夜宵', '10分钟快手', '一锅端']
  }
};

export default function MealCategoryView({ 
  mealType, 
  recipes, 
  onBack, 
  onSelectRecipe 
}) {
  const config = MEAL_CONFIG[mealType] || MEAL_CONFIG.lunch;

  // 严格只筛选属于当前餐型的菜谱（严禁混入其他餐类）
  const mealRecipes = recipes.filter(r => Array.isArray(r.mealTypes) && r.mealTypes.includes(mealType));
  
  // Local sub-tag filter
  const [selectedTag, setSelectedTag] = useState('全部');

  // 当前标签下的有效候选池
  const filteredDishes = mealRecipes.filter(r => {
    if (selectedTag === '全部') return true;
    if (selectedTag === '⚡ 5分钟极速') return r.minutes <= 6;
    return r.tags && r.tags.includes(selectedTag);
  });

  // 严格在当前餐型的候选池中初始化和抽取
  const [randomDish, setRandomDish] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 切换餐型或标签时，确保抽卡卡片严格对应当前池子中的菜品
  useEffect(() => {
    const currentPool = filteredDishes.length > 0 ? filteredDishes : mealRecipes;
    if (currentPool.length > 0) {
      const idx = Math.floor(Math.random() * currentPool.length);
      setRandomDish(currentPool[idx]);
    } else {
      setRandomDish(null);
    }
  }, [mealType, selectedTag]);

  const drawCard = () => {
    const currentPool = filteredDishes.length > 0 ? filteredDishes : mealRecipes;
    if (currentPool.length === 0) return;

    setIsDrawing(true);
    setTimeout(() => {
      // 随机抽取不重复的下一张（如果有多张）
      const otherDishes = currentPool.filter(d => !randomDish || d.id !== randomDish.id);
      const nextPool = otherDishes.length > 0 ? otherDishes : currentPool;
      const next = nextPool[Math.floor(Math.random() * nextPool.length)];
      setRandomDish(next);
      setIsDrawing(false);
    }, 280);
  };

  const handleConfirmDraw = () => {
    confetti({ particleCount: 70, spread: 60 });
    if (randomDish) {
      onSelectRecipe(randomDish);
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      
      {/* Sub-page Navigation Header */}
      <div style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: 'var(--bg-main)',
        zIndex: 40,
        borderBottom: '1px solid var(--border-light)'
      }}>
        <button
          onClick={onBack}
          style={{
            background: '#FFFBF6',
            border: '1px solid var(--border-light)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} color="#3D2C20" />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#3D2C20' }}>
            {config.title}
          </div>
          <div style={{ fontSize: 11, color: '#7A6A5D' }}>
            {config.subtitle}
          </div>
        </div>

        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        
        {/* 专属抽灵感卡模块（严格只在当前餐型候选池中抽取） */}
        <div style={{
          background: config.bannerGradient,
          border: `1.5px solid ${config.borderCol}`,
          borderRadius: 20,
          padding: 16,
          marginBottom: 20,
          boxShadow: '0 6px 18px rgba(180, 120, 70, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dices size={18} color="#FF7417" />
              {config.drawTitle}
            </div>
            <span style={{ fontSize: 11, color: '#FF7417', fontWeight: 700, background: '#FFFFFF', padding: '2px 8px', borderRadius: 10 }}>
              仅从下方 {filteredDishes.length} 道{config.categoryName}中随机
            </span>
          </div>

          <div style={{ fontSize: 11, color: '#7A6A5D', marginBottom: 12 }}>
            不知道吃什么？在当前【{config.categoryName}】专属菜品中一键抽取灵感：
          </div>

          {/* Card Box */}
          {randomDish ? (
            <div 
              onClick={() => onSelectRecipe(randomDish)}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 12,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                border: '1px solid #F3E6D8',
                marginBottom: 12,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                transform: isDrawing ? 'scale(0.97)' : 'scale(1)'
              }}
            >
              <img 
                src={randomDish.coverImage} 
                alt={randomDish.title} 
                style={{ width: 74, height: 74, borderRadius: 12, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#3D2C20' }}>
                  {randomDish.title}
                </div>
                <div style={{ fontSize: 11, color: '#7A6A5D', margin: '3px 0' }}>
                  {randomDish.subtitle}
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#A39386' }}>
                  <span>⏱️ {randomDish.cookTime}</span>
                  <span>🔥 {randomDish.calories}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, textAlign: 'center', color: '#A39386', marginBottom: 12, fontSize: 12 }}>
              当前分类暂无可抽取的菜品
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn-secondary"
              onClick={drawCard}
              disabled={isDrawing || filteredDishes.length <= 1}
              style={{ flex: 1, padding: '9px 0', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
            >
              <RefreshCw size={14} className={isDrawing ? 'spin' : ''} />
              换一道{config.categoryName}
            </button>
            <button
              className="btn-primary"
              onClick={handleConfirmDraw}
              disabled={!randomDish}
              style={{ flex: 1.5, padding: '9px 0', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
            >
              <CheckCircle size={14} />
              就吃这道！看做法
            </button>
          </div>
        </div>

        {/* Sub-filters for this Meal */}
        <div style={{ fontSize: 15, fontWeight: 900, color: '#3D2C20', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>📋 {config.categoryName}菜谱清单 ({filteredDishes.length} 道)</span>
          <span style={{ fontSize: 11, color: '#A39386', fontWeight: 400 }}>点击卡片可查看做法</span>
        </div>

        <div className="tags-scroll-container" style={{ marginBottom: 14 }}>
          {config.tags.map(t => (
            <button
              key={t}
              className={`filter-tag-btn ${selectedTag === t ? 'active' : ''}`}
              onClick={() => setSelectedTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 属于当前餐型的全部菜品列表展示 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredDishes.map(dish => {
            const isCurrentSelected = randomDish && randomDish.id === dish.id;
            return (
              <div
                key={dish.id}
                onClick={() => onSelectRecipe(dish)}
                style={{
                  background: isCurrentSelected ? '#FFF8F2' : '#FFFFFF',
                  border: isCurrentSelected ? '1.5px solid #FF7417' : '1px solid #F3E6D8',
                  borderRadius: 16,
                  padding: 12,
                  display: 'flex',
                  gap: 12,
                  cursor: 'pointer',
                  boxShadow: isCurrentSelected ? '0 4px 14px rgba(255, 116, 23, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <img 
                  src={dish.coverImage} 
                  alt={dish.title} 
                  style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#3D2C20' }}>
                      {dish.title}
                    </div>
                    {isCurrentSelected && (
                      <span style={{ fontSize: 10, background: '#FF7417', color: 'white', padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>
                        当前抽取
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#7A6A5D', margin: '3px 0', lineClamp: 1, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {dish.subtitle}
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#A39386' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Clock size={11} color="#FF7417" /> {dish.cookTime}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Flame size={11} color="#FF7417" /> {dish.calories}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} color="#A39386" />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
