import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, Heart, Share2, Flame, Clock, ChefHat, 
  Check, Play, Pause, RotateCcw, Sparkles, Zap, Users, Lightbulb, PlayCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RecipeDetailModal({ 
  recipe, 
  onClose, 
  onToggleFavorite, 
  onToggleLike, 
  onLogCooked,
  onOpenCookingMode
}) {
  const [cookwareMode, setCookwareMode] = useState('induction'); // 'induction' or 'riceCooker'
  const [portionMultiplier, setPortionMultiplier] = useState(1); // 1 = 1人食, 2 = 2人食, 3 = 3人食
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  if (!recipe) return null;

  // Has rice cooker support?
  const canUseRiceCooker = Boolean(recipe.riceCookerFriendly && recipe.riceCookerSteps);

  // Active steps based on cookware mode
  const currentSteps = (cookwareMode === 'riceCooker' && canUseRiceCooker) 
    ? recipe.riceCookerSteps 
    : recipe.steps;

  // Toggle ingredient checkbox
  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Timer logic for cooking steps
  const startStepTimer = (stepIdx, durationMinutes) => {
    if (activeTimers[stepIdx]) {
      clearInterval(activeTimers[stepIdx].intervalId);
      const newTimers = { ...activeTimers };
      delete newTimers[stepIdx];
      setActiveTimers(newTimers);
    } else {
      let secondsLeft = durationMinutes * 60;
      const intervalId = setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          clearInterval(intervalId);
          confetti({ particleCount: 60, spread: 70 });
          showToast(`⏱️ 步骤 ${stepIdx + 1} 计时结束！`);
          setActiveTimers(prev => {
            const next = { ...prev };
            delete next[stepIdx];
            return next;
          });
        } else {
          setActiveTimers(prev => ({
            ...prev,
            [stepIdx]: { secondsLeft, intervalId }
          }));
        }
      }, 1000);

      setActiveTimers(prev => ({
        ...prev,
        [stepIdx]: { secondsLeft, intervalId }
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(activeTimers).forEach(t => clearInterval(t.intervalId));
    };
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShare = () => {
    showToast('🔗 菜谱与烹饪指南已复制到剪贴板！');
  };

  const handleLogCooked = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    showToast(`🎉 太棒了！已打卡记录这顿美味！`);
    onLogCooked && onLogCooked(recipe);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 110 }} onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '95vh', maxHeight: '95vh' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Toast Alert */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(61, 44, 32, 0.92)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 30,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 140,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Sparkles size={16} color="#FFD54F" /> {toastMessage}
          </div>
        )}

        <div className="recipe-detail-container">
          {/* Cover Hero Image */}
          <div className="recipe-detail-hero">
            <img src={recipe.coverImage} alt={recipe.title} />
            <button className="recipe-back-btn" onClick={onClose} title="返回">
              <ArrowLeft size={20} color="#3D2C20" />
            </button>

            {/* Quick floating Cooking Mode Launcher */}
            <button
              onClick={() => onOpenCookingMode({ ...recipe, steps: currentSteps })}
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: 'rgba(0, 0, 0, 0.78)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              <PlayCircle size={16} color="#FF9800" />
              开启大字下厨模式
            </button>
          </div>

          <div className="recipe-detail-body">
            
            {/* Conditional Cookware Mode Selector (Only shown if genuinely rice-cooker friendly!) */}
            {canUseRiceCooker && (
              <div style={{
                background: '#F4EBE0',
                borderRadius: 14,
                padding: 4,
                display: 'flex',
                gap: 4,
                marginBottom: 14
              }}>
                <button
                  onClick={() => setCookwareMode('induction')}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: cookwareMode === 'induction' ? '#FFFFFF' : 'transparent',
                    color: cookwareMode === 'induction' ? '#FF7417' : '#7A6A5D',
                    fontWeight: cookwareMode === 'induction' ? 800 : 600,
                    fontSize: 13,
                    padding: '8px 0',
                    borderRadius: 10,
                    cursor: 'pointer',
                    boxShadow: cookwareMode === 'induction' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Zap size={14} fill="currentColor" /> ⚡ 电磁炉做法
                </button>

                <button
                  onClick={() => setCookwareMode('riceCooker')}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: cookwareMode === 'riceCooker' ? '#FFFFFF' : 'transparent',
                    color: cookwareMode === 'riceCooker' ? '#E65100' : '#7A6A5D',
                    fontWeight: cookwareMode === 'riceCooker' ? 800 : 600,
                    fontSize: 13,
                    padding: '8px 0',
                    borderRadius: 10,
                    cursor: 'pointer',
                    boxShadow: cookwareMode === 'riceCooker' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>🍚</span> 电饭煲懒人一锅出
                </button>
              </div>
            )}

            {/* Header Title & Favorite */}
            <div className="recipe-detail-title-row">
              <div>
                <div className="recipe-detail-title">{recipe.title}</div>
                {recipe.potType && (
                  <div style={{ fontSize: 11, color: '#FF7417', fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Zap size={12} fill="#FF7417" /> 推荐锅具: {recipe.potType}
                  </div>
                )}
              </div>
              <button 
                className="star-btn-lg" 
                onClick={() => onToggleFavorite(recipe.id)}
                title={recipe.isFavorite ? '已收藏' : '收藏'}
              >
                <Star 
                  size={26} 
                  fill={recipe.isFavorite ? '#FFB300' : 'none'} 
                  color={recipe.isFavorite ? '#FFB300' : '#C4B5A5'} 
                />
              </button>
            </div>

            {/* Subtitle Description */}
            <div className="recipe-detail-desc">
              {recipe.subtitle}
            </div>

            {/* Metrics Pill Card (Calories, Cook Time, Difficulty) */}
            <div className="metrics-pill-card">
              <div className="metric-column">
                <div className="metric-val-row">
                  <Flame size={18} color="#FF7417" fill="#FF7417" />
                  <span>{recipe.caloriesValue * portionMultiplier}</span>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>kcal</span>
                </div>
                <div className="metric-label">预估热量</div>
              </div>

              <div className="metric-column">
                <div className="metric-val-row">
                  <Clock size={18} color="#FF7417" />
                  <span>{recipe.minutes}</span>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>分钟</span>
                </div>
                <div className="metric-label">烹饪用时</div>
              </div>

              <div className="metric-column">
                <div className="metric-val-row">
                  <ChefHat size={18} color="#FF7417" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="metric-label">难度</div>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="recipe-detail-tags">
              {recipe.tags.map((tag, idx) => (
                <span key={idx} className="detail-tag-chip">
                  {tag}
                </span>
              ))}
            </div>

            {/* Induction / Rice Cooker Advice Card */}
            {cookwareMode === 'riceCooker' && canUseRiceCooker ? (
              <div style={{
                background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE8A3 100%)',
                border: '1.5px solid #FFE082',
                borderRadius: 14,
                padding: '12px 14px',
                marginBottom: 16,
                fontSize: 12,
                color: '#4E342E',
                lineHeight: 1.55
              }}>
                <div style={{ fontWeight: 800, color: '#E65100', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>🍚</span> 电饭煲免看火一锅出诀窍:
                </div>
                <div>{recipe.riceCookerTips || '食材放入内胆淋入酱汁，按下【煮饭键】或【快煮键】即可自动出锅！'}</div>
              </div>
            ) : (
              recipe.inductionTips && (
                <div style={{
                  background: 'linear-gradient(135deg, #FFF9F2 0%, #FFEEDD 100%)',
                  border: '1px solid #F6D6B9',
                  borderRadius: 14,
                  padding: '12px 14px',
                  marginBottom: 16,
                  fontSize: 12,
                  color: '#5D4037',
                  lineHeight: 1.5
                }}>
                  <div style={{ fontWeight: 800, color: '#D84315', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Zap size={14} fill="#D84315" /> 电磁炉火力调校建议:
                  </div>
                  <div>{recipe.inductionTips}</div>
                </div>
              )
            )}

            {/* Smart Substitutions / Tips */}
            {recipe.substitutionTips && (
              <div style={{
                background: '#F1F8E9',
                border: '1px solid #DCEDC8',
                borderRadius: 14,
                padding: '10px 14px',
                marginBottom: 18,
                fontSize: 12,
                color: '#33691E'
              }}>
                <div style={{ fontWeight: 700, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Lightbulb size={14} /> 租房平替与免翻车贴士:
                </div>
                <div>{recipe.substitutionTips}</div>
              </div>
            )}

            {/* Section 1: Ingredients List with Portion Scaler */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div className="detail-section-title" style={{ margin: 0 }}>
                食材清单 <span style={{ fontSize: 12, fontWeight: 400, color: '#A39386' }}>(点击可划掉已备食材)</span>
              </div>

              {/* 1人食 / 2人食 / 3人食 Switcher */}
              <div style={{
                display: 'flex',
                background: '#F4EBE0',
                borderRadius: 20,
                padding: 2,
                gap: 2
              }}>
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    onClick={() => setPortionMultiplier(p)}
                    style={{
                      border: 'none',
                      background: portionMultiplier === p ? '#FF7417' : 'transparent',
                      color: portionMultiplier === p ? 'white' : '#7A6A5D',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 16,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p}人食
                  </button>
                ))}
              </div>
            </div>

            <div className="ingredients-grid-card">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients[idx];
                const calculatedAmount = ing.baseAmount 
                  ? `${ing.baseAmount * portionMultiplier} ${ing.unit || ''}`
                  : ing.amount;

                return (
                  <div 
                    key={idx} 
                    className={`ingredient-item-row ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleIngredientCheck(idx)}
                  >
                    <div className="ing-name">
                      <span style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: isChecked ? 'none' : '1.5px solid #C4B5A5',
                        background: isChecked ? '#FF7417' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span>{ing.icon}</span>
                      <span>{ing.name}</span>
                    </div>
                    <div className="ing-amount">{calculatedAmount}</div>
                  </div>
                );
              })}
            </div>

            {/* Section 2: Cooking Steps with Step Timers & Mode Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="detail-section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                制作步骤 · <span style={{ color: '#FF7417', fontSize: 13 }}>{cookwareMode === 'riceCooker' && canUseRiceCooker ? '🍚 电饭煲一键版' : '⚡ 电磁炉分步版'}</span>
              </div>
              <button
                onClick={() => onOpenCookingMode({ ...recipe, steps: currentSteps })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FF7417',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer'
                }}
              >
                <Play size={12} /> 大字下厨模式
              </button>
            </div>

            <div className="steps-list">
              {currentSteps.map((step, idx) => {
                const timerState = activeTimers[idx];
                return (
                  <div key={idx} className="step-card">
                    <div className="step-num-badge">
                      {step.stepNumber}
                    </div>
                    <div className="step-content">
                      <div className="step-header-row">
                        <div>
                          <div className="step-title">{step.title}</div>
                          {step.powerLevel && (
                            <span style={{ fontSize: 10, color: '#FF7417', fontWeight: 600 }}>
                              {step.powerLevel}
                            </span>
                          )}
                        </div>
                        {step.duration && (
                          <button 
                            className={`step-timer-btn ${timerState ? 'active' : ''}`}
                            onClick={() => startStepTimer(idx, step.duration)}
                          >
                            {timerState ? (
                              <>
                                <Pause size={12} /> {formatTimer(timerState.secondsLeft)}
                              </>
                            ) : (
                              <>
                                <Play size={12} /> {step.duration}分钟 计时
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <div className="step-desc">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="recipe-bottom-action-bar">
          <div className="action-icon-group">
            <button 
              className="action-icon-btn" 
              onClick={() => {
                onToggleFavorite(recipe.id);
                showToast(recipe.isFavorite ? '⭐ 已移出收藏' : '🌟 已加入心仪收藏！');
              }}
            >
              <Star 
                size={22} 
                fill={recipe.isFavorite ? '#FFB300' : 'none'} 
                color={recipe.isFavorite ? '#FFB300' : '#7A6A5D'} 
              />
              <span style={{ color: recipe.isFavorite ? '#FFB300' : '#7A6A5D', fontWeight: recipe.isFavorite ? 700 : 500 }}>
                {recipe.isFavorite ? '已收藏' : '收藏'}
              </span>
            </button>

            <button 
              className="action-icon-btn" 
              onClick={() => {
                onToggleLike(recipe.id);
                showToast(recipe.isLiked ? '🤍 已取消点赞' : '❤️ 已点赞喜欢！');
              }}
            >
              <Heart 
                size={22} 
                fill={recipe.isLiked ? '#FF4D4F' : 'none'} 
                color={recipe.isLiked ? '#FF4D4F' : '#7A6A5D'} 
              />
              <span style={{ color: recipe.isLiked ? '#FF4D4F' : '#7A6A5D', fontWeight: recipe.isLiked ? 700 : 500 }}>
                {recipe.isLiked ? `已赞 (${recipe.likes || 1})` : `点赞 (${recipe.likes || 0})`}
              </span>
            </button>

            <button className="action-icon-btn" onClick={handleShare}>
              <Share2 size={22} color="#7A6A5D" />
              <span>分享</span>
            </button>
          </div>

          <button className="log-cooked-btn" onClick={handleLogCooked}>
            记录做过
          </button>
        </div>
      </div>
    </div>
  );
}
