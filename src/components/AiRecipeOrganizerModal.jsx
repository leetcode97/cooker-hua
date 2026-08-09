import React, { useState, useRef } from 'react';
import { X, Wand2, Upload, FileText, CheckCircle2, Zap, Settings, Camera, Image } from 'lucide-react';

const API_BASE = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';

export default function AiRecipeOrganizerModal({ onClose, onAddParsedRecipe, onOpenAiConfig }) {
  const [inputText, setInputText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [previewRecipe, setPreviewRecipe] = useState(null);
  const [selectedMealTypes, setSelectedMealTypes] = useState(['lunch']); // default lunch
  const [inductionFriendly, setInductionFriendly] = useState(true);
  const [riceCookerFriendly, setRiceCookerFriendly] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [aiSource, setAiSource] = useState('');

  const fileInputRef = useRef(null);

  const sampleTexts = [
    "【蒜苔炒香肠】蒜苔切段、香肠切片，热油1400W爆香蒜片，下香肠煸出油，倒入蒜苔大火翻炒2分钟，加生抽少许盐出锅，只需8分钟。",
    "【黑椒洋葱肥牛】肥牛卷焯水，平底锅炒香洋葱丝，倒入肥牛加生抽蚝油黑胡椒大火炒1分钟盖饭吃，超香超下饭！"
  ];

  const mealOptions = [
    { key: 'breakfast', label: '🌅 早餐', desc: '早起速做' },
    { key: 'lunch', label: '☀️ 午餐', desc: '能量饱腹' },
    { key: 'dinner', label: '🌙 晚餐', desc: '治愈暖煲' },
    { key: 'night', label: '🌌 夜宵', desc: '深夜解馋' }
  ];

  const toggleMealType = (key) => {
    if (selectedMealTypes.includes(key)) {
      if (selectedMealTypes.length > 1) {
        setSelectedMealTypes(selectedMealTypes.filter(k => k !== key));
      }
    } else {
      setSelectedMealTypes([...selectedMealTypes, key]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCoverImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiParse = () => {
    if (!inputText.trim()) return;
    setIsParsing(true);

    fetch(`${API_BASE}/ai/parse-recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        targetMealType: selectedMealTypes[0] || 'lunch'
      })
    })
      .then(res => res.json())
      .then(res => {
        setIsParsing(false);
        if (res.success && res.recipe) {
          const parsed = res.recipe;
          setAiSource(res.source === 'ai_live' ? '🔥 实时大模型解析' : '🧠 智能菜谱结构化引擎');
          setPreviewRecipe({
            id: Date.now().toString(),
            title: parsed.title || '整理私房菜',
            subtitle: parsed.subtitle || '根据您的记录提炼的标准菜谱。',
            coverImage: coverImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            cookTime: parsed.cookTime || '12 分钟',
            minutes: parsed.minutes || 12,
            calories: parsed.calories || '320 kcal',
            caloriesValue: parsed.caloriesValue || 320,
            difficulty: parsed.difficulty || '简单',
            mealTypes: selectedMealTypes,
            inductionFriendly,
            riceCookerFriendly,
            tags: ['AI整理', '家常菜', '电磁炉友好'],
            likes: 1,
            isLiked: false,
            isFavorite: true,
            author: '我的私房整理',
            publishDate: new Date().toISOString().split('T')[0],
            ingredients: parsed.ingredients || [
              { name: '主料', amount: '适量', icon: '🥩' },
              { name: '生抽', amount: '15ml', icon: '🍾' }
            ],
            steps: parsed.steps || [
              { stepNumber: 1, title: '准备工作', description: '食材切好备用。', duration: 2 },
              { stepNumber: 2, title: '下锅烹饪', description: '下锅大火翻炒断生。', duration: 4 },
              { stepNumber: 3, title: '调味出锅', description: '调味翻匀出锅享用。', duration: 2 }
            ]
          });
        }
      })
      .catch(err => {
        setIsParsing(false);
        console.error('AI Parse failed:', err);
      });
  };

  const handleSave = () => {
    if (previewRecipe) {
      const finalRecipe = {
        ...previewRecipe,
        coverImage: coverImage || previewRecipe.coverImage,
        mealTypes: selectedMealTypes,
        inductionFriendly,
        riceCookerFriendly
      };
      onAddParsedRecipe(finalRecipe);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '92vh', maxHeight: '92vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wand2 size={20} color="#FF7417" />
            帮我整理菜谱 · AI 智能解析
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px 80px' }}>
          {!previewRecipe ? (
            <>
              <div style={{ fontSize: 13, color: '#7A6A5D', marginBottom: 14 }}>
                粘贴文字笔记、聊天做菜记录，可附带拍照，AI 会自动提炼为标准菜谱并归类到你指定的餐型中。
              </div>

              {/* 1. Meal Category Destination Selector */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', marginBottom: 8 }}>
                  🎯 归类添加到哪个餐型中：
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                  {mealOptions.map(opt => {
                    const isSelected = selectedMealTypes.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleMealType(opt.key)}
                        style={{
                          border: isSelected ? '1.5px solid #FF7417' : '1px solid #E0D4C5',
                          background: isSelected ? '#FFF0E5' : '#FFFFFF',
                          color: isSelected ? '#FF7417' : '#3D2C20',
                          borderRadius: 12,
                          padding: '8px 4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontWeight: isSelected ? 800 : 500,
                          fontSize: 12,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div>{opt.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Photo Upload or Take Photo */}
              <div style={{ marginBottom: 14 }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />

                {coverImage ? (
                  <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', height: 100, border: '1.5px solid #FFCC80' }}>
                    <img src={coverImage} alt="菜品预览" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        padding: '2px 6px',
                        fontSize: 10,
                        cursor: 'pointer'
                      }}
                    >
                      删除照片
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '1.5px dashed #E0D4C5',
                      borderRadius: 12,
                      background: '#FAF5EE',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      color: '#7A6A5D',
                      fontSize: 12
                    }}
                  >
                    <Camera size={16} color="#FF7417" />
                    <span>📸 点击附加做好的实拍照片（可选）</span>
                  </div>
                )}
              </div>

              {/* 3. Cookware Options */}
              <div style={{ marginBottom: 14, display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setInductionFriendly(!inductionFriendly)}
                  style={{
                    flex: 1,
                    border: inductionFriendly ? '1.5px solid #FF7417' : '1px solid #E0D4C5',
                    background: inductionFriendly ? '#FFF0E5' : '#FFFFFF',
                    color: inductionFriendly ? '#FF7417' : '#7A6A5D',
                    borderRadius: 12,
                    padding: '8px 10px',
                    fontSize: 12,
                    fontWeight: inductionFriendly ? 800 : 500,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ 适合电磁炉: {inductionFriendly ? '是' : '否'}
                </button>

                <button
                  type="button"
                  onClick={() => setRiceCookerFriendly(!riceCookerFriendly)}
                  style={{
                    flex: 1,
                    border: riceCookerFriendly ? '1.5px solid #2E7D32' : '1px solid #E0D4C5',
                    background: riceCookerFriendly ? '#E8F5E9' : '#FFFFFF',
                    color: riceCookerFriendly ? '#2E7D32' : '#7A6A5D',
                    borderRadius: 12,
                    padding: '8px 10px',
                    fontSize: 12,
                    fontWeight: riceCookerFriendly ? 800 : 500,
                    cursor: 'pointer'
                  }}
                >
                  🍚 适合电饭煲: {riceCookerFriendly ? '是' : '否'}
                </button>
              </div>

              {/* Quick Template Fill Buttons */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#A39386', marginBottom: 6 }}>
                  💡 点击示例快速体验：
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {sampleTexts.map((sample, i) => (
                    <button
                      key={i}
                      onClick={() => setInputText(sample)}
                      style={{
                        background: '#FFF8F0',
                        border: '1px dashed #F6D6B9',
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: 12,
                        color: '#7A6A5D',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="在此粘贴零散笔记、做菜步骤心得或口述文本..."
                  style={{
                    width: '100%',
                    borderRadius: 14,
                    border: '1.5px solid #F3E6D8',
                    padding: 14,
                    fontSize: 14,
                    color: '#3D2C20',
                    outline: 'none',
                    resize: 'none',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onOpenAiConfig}
                  style={{ padding: '12px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Settings size={14} /> AI 密钥
                </button>

                <button
                  className="btn-primary"
                  onClick={handleAiParse}
                  disabled={isParsing || !inputText.trim()}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', fontSize: 14 }}
                >
                  {isParsing ? '智能提炼整理中...' : '✨ 开始 AI 自动整理'}
                </button>
              </div>
            </>
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <CheckCircle2 size={36} color="#4CAF50" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: 17, fontWeight: 900, color: '#3D2C20' }}>
                  解析完成！已为你结构化
                </div>
                <div style={{ fontSize: 12, color: '#7A6A5D', marginTop: 2 }}>
                  {aiSource} · 已归类至: {selectedMealTypes.map(k => mealOptions.find(o => o.key === k)?.label).join('、')}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #F3E6D8', borderRadius: 16, padding: 16, marginBottom: 20 }}>
                {coverImage && (
                  <img src={coverImage} alt="菜品实拍" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: 10 }} />
                )}

                <div style={{ fontSize: 17, fontWeight: 900, color: '#FF7417', marginBottom: 4 }}>
                  {previewRecipe.title}
                </div>
                <div style={{ fontSize: 12, color: '#7A6A5D', marginBottom: 12 }}>
                  预计时长: {previewRecipe.cookTime} · 热量: {previewRecipe.calories}
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', marginBottom: 6 }}>
                  🥗 提取食材清单:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {previewRecipe.ingredients.map((ing, idx) => (
                    <span key={idx} style={{ background: '#FFF0E5', color: '#FF7417', fontSize: 12, padding: '3px 8px', borderRadius: 8 }}>
                      {ing.name} {ing.amount}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', marginBottom: 6 }}>
                  📖 整理步骤:
                </div>
                {previewRecipe.steps.map((st, idx) => (
                  <div key={idx} style={{ fontSize: 12, color: '#7A6A5D', marginBottom: 4 }}>
                    {st.stepNumber}. {st.title}：{st.description}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setPreviewRecipe(null)} style={{ flex: 1 }}>
                  重新输入
                </button>
                <button className="btn-primary" onClick={handleSave} style={{ flex: 1.5 }}>
                  保存并加入对应餐型
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
