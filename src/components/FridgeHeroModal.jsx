import React, { useState, useEffect } from 'react';
import { X, Refrigerator, Check, ArrowRight, Sparkles, Globe, ChefHat, Plus, Settings, RefreshCw, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateRecipesWithAi, getAiConfig } from '../services/aiService';

const FRIDGE_PRESETS = [
  {
    name: '🥬 常见蔬菜',
    items: ['番茄', '土豆', '洋葱', '青椒', '金针菇', '娃娃菜', '大蒜', '小葱', '豆角']
  },
  {
    name: '🥩 肉禽蛋品',
    items: ['鸡蛋', '肥牛卷', '去骨鸡腿肉', '鲜虾', '速冻云吞', '火腿肠', '猪肉丝', '巴沙鱼柳']
  },
  {
    name: '🥫 主食与调料',
    items: ['挂面', '方便面', '手抓饼', '大米', '吐司面包', '生抽', '蚝油', '芝士片', '咖喱块']
  }
];

export default function FridgeHeroModal({ 
  recipes, 
  onClose, 
  onSelectRecipe, 
  onAddRecipe, 
  onOpenAiConfig 
}) {
  const [selectedIngredients, setSelectedIngredients] = useState([
    '鸡蛋', '番茄', '生抽', '小葱'
  ]);
  const [customIngInput, setCustomIngInput] = useState('');
  const [activeSourceTab, setActiveSourceTab] = useState('menu'); // 'menu' (本地菜单匹配) or 'online' (AI 实时搜索)
  
  // AI Real-time Generation State
  const [aiRecipes, setAiRecipes] = useState([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSource, setAiSource] = useState('');
  const [savedSuccessMap, setSavedSuccessMap] = useState({});

  const toggleIngredient = (name) => {
    let next;
    if (selectedIngredients.includes(name)) {
      next = selectedIngredients.filter(i => i !== name);
    } else {
      next = [...selectedIngredients, name];
    }
    setSelectedIngredients(next);
  };

  const handleAddCustomIngredient = (e) => {
    e.preventDefault();
    if (customIngInput.trim() && !selectedIngredients.includes(customIngInput.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngInput.trim()]);
      setCustomIngInput('');
    }
  };

  // 1. Match against current curated recipe database (本地 25 道菜兜底与精确匹配)
  const matchedRecipes = recipes.map(recipe => {
    const totalCount = recipe.ingredients ? recipe.ingredients.length : 1;
    const matchCount = recipe.ingredients ? recipe.ingredients.filter(ing => 
      selectedIngredients.some(s => ing.name.includes(s) || s.includes(ing.name))
    ).length : 0;
    const matchRatio = totalCount > 0 ? (matchCount / totalCount) : 0;
    const missing = recipe.ingredients ? recipe.ingredients.filter(ing => 
      !selectedIngredients.some(s => ing.name.includes(s) || s.includes(ing.name))
    ) : [];

    return {
      ...recipe,
      matchCount,
      totalCount,
      matchPercent: Math.round(matchRatio * 100),
      missing
    };
  }).filter(r => r.matchCount > 0).sort((a, b) => b.matchPercent - a.matchPercent);

  // 2. Call Real-time AI Generation
  const handleTriggerAiSearch = async (ings = selectedIngredients) => {
    if (!ings || ings.length === 0) {
      setAiRecipes([]);
      return;
    }

    setIsAiGenerating(true);
    try {
      const res = await generateRecipesWithAi(ings);
      setIsAiGenerating(false);
      if (res.success && Array.isArray(res.recipes)) {
        setAiRecipes(res.recipes);
        setAiSource(res.source === 'ai_live' ? '🔥 已调用云端 DeepSeek 大模型实时思考' : '🧠 智能算法烹饪引擎（未配 Key 自动兜底）');
      }
    } catch (err) {
      setIsAiGenerating(false);
      console.error('AI generate error:', err);
    }
  };

  // Auto trigger AI generation on mount or tab switch
  useEffect(() => {
    if (activeSourceTab === 'online') {
      handleTriggerAiSearch(selectedIngredients);
    }
  }, [activeSourceTab, selectedIngredients.join(',')]);

  const handleSaveAiRecipeToMenu = (recipe, idx) => {
    const fullRecipe = {
      id: Date.now().toString(),
      title: recipe.title,
      subtitle: recipe.subtitle || 'AI 实时为冰箱食材生成的极简自炊做法。',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: recipe.cookTime || '12 分钟',
      minutes: recipe.minutes || 12,
      calories: recipe.calories || '320 kcal',
      caloriesValue: 320,
      difficulty: '简单',
      mealTypes: recipe.mealTypes || ['lunch', 'dinner'],
      inductionFriendly: recipe.inductionFriendly !== false,
      riceCookerFriendly: Boolean(recipe.riceCookerFriendly),
      inductionTips: recipe.inductionTips || '电磁炉中大火快速翻炒，收汁出锅。',
      tags: ['AI实时生成', '电磁炉友好', '冰箱自炊'],
      likes: 1,
      isLiked: false,
      isFavorite: true,
      author: 'AI 厨神助手',
      publishDate: new Date().toISOString().split('T')[0],
      ingredients: recipe.ingredients || selectedIngredients.map(n => ({ name: n, amount: '适量', icon: '🥗' })),
      steps: recipe.steps || [
        { stepNumber: 1, title: '准备食材', description: '食材切好备用。', duration: 2 },
        { stepNumber: 2, title: '下锅烹饪', description: '热油下食材大火翻炒断生。', duration: 4 },
        { stepNumber: 3, title: '调味出锅', description: '淋入生抽盐翻匀出锅！', duration: 2 }
      ]
    };

    onAddRecipe && onAddRecipe(fullRecipe);
    confetti({ particleCount: 70, spread: 60 });
    setSavedSuccessMap(prev => ({ ...prev, [idx]: true }));
  };

  const hasConfiguredKey = Boolean(getAiConfig().apiKey);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '94vh', maxHeight: '94vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Refrigerator size={22} color="#FF7417" />
            家里有什么 · 智能食材搜寻
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px 80px' }}>
          <div style={{ fontSize: 13, color: '#7A6A5D', marginBottom: 12 }}>
            勾选或输入冰箱现有食材，支持<b>本地菜单匹配</b>与 <b>AI 实时全网搜索搭配</b>！
          </div>

          {/* Add custom ingredient input */}
          <form onSubmit={handleAddCustomIngredient} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input
              type="text"
              className="search-input"
              style={{ flex: 1, padding: '8px 12px', fontSize: 13, borderRadius: 12, border: '1px solid #F3E6D8' }}
              placeholder="输入特殊食材（如吃剩的烤鸭、半块豆腐...）"
              value={customIngInput}
              onChange={(e) => setCustomIngInput(e.target.value)}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: 12 }}>
              <Plus size={14} /> 添加
            </button>
          </form>

          {/* Ingredient Selector Sections */}
          {FRIDGE_PRESETS.map((cat, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#3D2C20', marginBottom: 6 }}>
                {cat.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cat.items.map((item) => {
                  const isSelected = selectedIngredients.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleIngredient(item)}
                      style={{
                        background: isSelected ? '#FFF0E5' : '#FFFFFF',
                        border: isSelected ? '1.5px solid #FF7417' : '1px solid #F3E6D8',
                        color: isSelected ? '#FF7417' : '#3D2C20',
                        fontWeight: isSelected ? 800 : 500,
                        fontSize: 12,
                        padding: '5px 10px',
                        borderRadius: 16,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Source Switch Tabs */}
          <div style={{ marginTop: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', background: '#F4EBE0', borderRadius: 14, padding: 3, gap: 4 }}>
              <button
                type="button"
                onClick={() => setActiveSourceTab('menu')}
                style={{
                  flex: 1,
                  border: 'none',
                  background: activeSourceTab === 'menu' ? '#FFFFFF' : 'transparent',
                  color: activeSourceTab === 'menu' ? '#FF7417' : '#7A6A5D',
                  fontWeight: activeSourceTab === 'menu' ? 800 : 600,
                  fontSize: 13,
                  padding: '9px 0',
                  borderRadius: 10,
                  cursor: 'pointer',
                  boxShadow: activeSourceTab === 'menu' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                📖 本地菜单匹配 ({matchedRecipes.length} 道)
              </button>

              <button
                type="button"
                onClick={() => setActiveSourceTab('online')}
                style={{
                  flex: 1,
                  border: 'none',
                  background: activeSourceTab === 'online' ? '#FFFFFF' : 'transparent',
                  color: activeSourceTab === 'online' ? '#E65100' : '#7A6A5D',
                  fontWeight: activeSourceTab === 'online' ? 800 : 600,
                  fontSize: 13,
                  padding: '9px 0',
                  borderRadius: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  boxShadow: activeSourceTab === 'online' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <Sparkles size={14} color="#FF7417" />
                AI 实时全网搜索搭配
              </button>
            </div>
          </div>

          {/* 1. Tab 1: Local Menu Matching (本地 25 道菜库兜底与精准匹配) */}
          {activeSourceTab === 'menu' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {matchedRecipes.length > 0 ? (
                matchedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #F3E6D8',
                      borderRadius: 16,
                      padding: 12,
                      display: 'flex',
                      gap: 12,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      alignItems: 'center'
                    }}
                  >
                    <img 
                      src={recipe.coverImage} 
                      alt={recipe.title} 
                      style={{ width: 68, height: 68, borderRadius: 12, objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#3D2C20' }}>
                          {recipe.title}
                        </div>
                        <span style={{ 
                          fontSize: 11, 
                          color: recipe.matchPercent >= 60 ? '#2E7D32' : '#FF7417', 
                          fontWeight: 800,
                          background: recipe.matchPercent >= 60 ? '#E8F5E9' : '#FFF0E5',
                          padding: '2px 6px',
                          borderRadius: 8
                        }}>
                          匹配度 {recipe.matchPercent}%
                        </span>
                      </div>
                      
                      <div style={{ fontSize: 11, color: '#7A6A5D', margin: '2px 0' }}>
                        {recipe.cookTime} · 匹配 {recipe.matchCount}/{recipe.totalCount} 样食材
                      </div>

                      {recipe.missing.length > 0 ? (
                        <div style={{ fontSize: 11, color: '#A39386' }}>
                          缺: {recipe.missing.slice(0, 2).map(m => m.name).join('、')}
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700 }}>
                          ✅ 食材完全齐全，现在就能做！
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px 20px', textAlign: 'center', color: '#A39386', background: '#FFFFFF', borderRadius: 16, border: '1px dashed #F3E6D8' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>🧺</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3D2C20' }}>本地菜单暂无完全匹配的菜品</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    点击上方 <b>“AI 实时全网搜索搭配”</b>，让 AI 为你的独特食材量身定制菜谱！
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Tab 2: Real-time AI Generation (大模型实时联网构思 + 智能算法兜底) */}
          {activeSourceTab === 'online' && (
            <div>
              {/* AI Controller Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#7A6A5D', fontWeight: 600 }}>
                  {aiSource || 'AI 思考中...'}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={onOpenAiConfig}
                    style={{
                      background: hasConfiguredKey ? '#E8F5E9' : '#FFF0E5',
                      border: 'none',
                      color: hasConfiguredKey ? '#2E7D32' : '#FF7417',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3
                    }}
                  >
                    <Settings size={12} /> {hasConfiguredKey ? '已配置 Key' : '配置大模型 Key'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerAiSearch(selectedIngredients)}
                    disabled={isAiGenerating}
                    style={{
                      background: '#FF7417',
                      border: 'none',
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <RefreshCw size={12} className={isAiGenerating ? 'spin' : ''} /> 重新让 AI 构思
                  </button>
                </div>
              </div>

              {isAiGenerating ? (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  padding: 30,
                  textAlign: 'center',
                  border: '1.5px dashed #FFD54F',
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.08)'
                }}>
                  <Sparkles size={32} color="#FF7417" className="spin" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#3D2C20' }}>
                    AI 正在结合全网热门做法进行食材搭配...
                  </div>
                  <div style={{ fontSize: 12, color: '#7A6A5D', marginTop: 4 }}>
                    已分析食材：【{selectedIngredients.join('、')}】
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {aiRecipes.map((dish, idx) => {
                    const isSaved = savedSuccessMap[idx];
                    return (
                      <div
                        key={idx}
                        style={{
                          background: '#FFFFFF',
                          border: '1.5px solid #FFE082',
                          borderRadius: 18,
                          padding: 14,
                          boxShadow: '0 4px 14px rgba(255, 160, 0, 0.08)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <div style={{ fontSize: 16, fontWeight: 900, color: '#3D2C20' }}>
                            ✨ {dish.title}
                          </div>
                          <span style={{ fontSize: 11, background: '#FFF3E0', color: '#E65100', padding: '2px 8px', borderRadius: 8, fontWeight: 700 }}>
                            ⏱️ {dish.cookTime || '10 分钟'}
                          </span>
                        </div>

                        <div style={{ fontSize: 12, color: '#7A6A5D', marginBottom: 10 }}>
                          {dish.subtitle}
                        </div>

                        {/* Induction / Cookware guidance */}
                        {dish.inductionTips && (
                          <div style={{ fontSize: 11, color: '#D84315', background: '#FFF3E0', padding: '6px 10px', borderRadius: 8, marginBottom: 10, lineHeight: 1.4 }}>
                            <b>⚡ 电磁炉火力:</b> {dish.inductionTips}
                          </div>
                        )}

                        {/* Steps */}
                        <div style={{ fontSize: 12, color: '#4E342E', marginBottom: 12 }}>
                          {dish.steps && dish.steps.map((st, sIdx) => (
                            <div key={sIdx} style={{ marginBottom: 3 }}>
                              <b>{st.stepNumber}. {st.title}：</b>{st.description}
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => handleSaveAiRecipeToMenu(dish, idx)}
                            disabled={isSaved}
                            style={{ flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                          >
                            {isSaved ? '✅ 已加入我的菜谱库！' : '➕ 一键保存到我的菜谱'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
