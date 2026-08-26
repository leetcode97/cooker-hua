import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, Camera, Image, Upload } from 'lucide-react';

export default function AddRecipeModal({ onClose, onSave, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [cookTime, setCookTime] = useState(initialData?.minutes?.toString() || initialData?.cookTime?.replace(/[^0-9]/g, '') || '15');
  const [calories, setCalories] = useState(initialData?.caloriesValue?.toString() || initialData?.calories?.replace(/[^0-9]/g, '') || '320');
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || '简单');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '家常菜, 快手菜');
  const [selectedMealTypes, setSelectedMealTypes] = useState(initialData?.mealTypes || ['lunch']);
  const [inductionFriendly, setInductionFriendly] = useState(initialData?.inductionFriendly ?? true);
  const [riceCookerFriendly, setRiceCookerFriendly] = useState(initialData?.riceCookerFriendly ?? false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  
  const fileInputRef = useRef(null);

  const [ingredients, setIngredients] = useState(initialData?.ingredients?.map(i => ({
    name: i.name,
    amount: i.amount + (i.unit || ''),
    icon: i.icon || '🥗',
    type: i.type || 'veg'
  })) || [
    { name: '主要食材', amount: '200克', icon: '🥩', type: 'meat' },
    { name: '生抽', amount: '15ml', icon: '🍾', type: 'pantry' }
  ]);

  const [steps, setSteps] = useState(initialData?.steps || [
    { stepNumber: 1, title: '准备工作', description: '洗净食材切好备用。', duration: 3 },
    { stepNumber: 2, title: '下锅烹饪', description: '电磁炉大火热油倒入食材翻炒调味出锅。', duration: 5 }
  ]);

  const mealOptions = [
    { key: 'breakfast', label: '🌅 早餐' },
    { key: 'lunch', label: '☀️ 午餐' },
    { key: 'dinner', label: '🌙 晚餐' },
    { key: 'night', label: '🌌 夜宵' }
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

  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileInput = e.target;
    setIsCompressing(true);

    try {
      const objectUrl = URL.createObjectURL(file);
      const img = new window.Image();
      
      img.onload = () => {
        try {
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round(height * (MAX_SIZE / width));
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round(width * (MAX_SIZE / height));
              height = MAX_SIZE;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setCoverImage(compressedBase64);
        } catch (err) {
          alert('压缩图片时出错: ' + err.message);
        } finally {
          URL.revokeObjectURL(objectUrl);
          fileInput.value = '';
          setIsCompressing(false);
        }
      };

      img.onerror = () => {
        alert('图片加载失败，可能格式不被浏览器支持（如部分 HEIC）。请尝试换一张图。');
        URL.revokeObjectURL(objectUrl);
        fileInput.value = '';
        setIsCompressing(false);
      };

      img.src = objectUrl;
    } catch (err) {
      alert('读取文件时出错: ' + err.message);
      fileInput.value = '';
      setIsCompressing(false);
    }
  };

  const handleAddIngredientRow = () => {
    setIngredients([...ingredients, { name: '', amount: '', icon: '🥗', type: 'veg' }]);
  };

  const handleRemoveIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const handleAddStepRow = () => {
    setSteps([
      ...steps,
      { stepNumber: steps.length + 1, title: `步骤 ${steps.length + 1}`, description: '', duration: 5 }
    ]);
  };

  const handleRemoveStep = (idx) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedIngredients = ingredients.filter(i => i.name.trim()).map(i => {
      const match = i.amount.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
      return {
        name: i.name,
        amount: match ? parseFloat(match[1]) : i.amount,
        unit: match ? match[2] : '',
        baseAmount: match ? parseFloat(match[1]) : i.amount,
        icon: i.icon,
        type: i.type
      };
    });

    const newRecipe = {
      id: initialData?.id || `custom_${Date.now()}`,
      title,
      subtitle,
      cookTime: `${cookTime} 分钟`,
      minutes: parseInt(cookTime) || 15,
      calories: `${calories} kcal`,
      caloriesValue: parseInt(calories) || 320,
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      mealTypes: selectedMealTypes,
      potType: inductionFriendly ? '平底锅' : '电饭煲',
      inductionFriendly,
      riceCookerFriendly,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      ingredients: formattedIngredients,
      steps: steps.map((s, i) => ({ ...s, stepNumber: i + 1 })),
      author: initialData?.author || '我',
      publishDate: initialData?.publishDate || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      likes: initialData?.likes || 0,
      isLiked: initialData?.isLiked || false,
      isFavorite: initialData?.isFavorite || false
    };

    onSave(newRecipe);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '92vh', maxHeight: '92vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            ✍️ 发布/创建自定义菜谱
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '16px 20px 80px' }}>
          
          {/* Photo Upload Area */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 6 }}>
              📸 菜品照片（手机直接拍照或相册选取）
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            {coverImage ? (
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', border: '1.5px solid #FFCC80' }}>
                <img src={coverImage} alt="菜品预览" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isCompressing ? 0.5 : 1 }} />
                
                {isCompressing && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)' }}>
                    <div style={{ color: '#FF7417', fontWeight: 'bold' }}>图片处理中...</div>
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  display: 'flex',
                  gap: 6
                }}>
                  <button
                    type="button"
                    disabled={isCompressing}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '4px 8px',
                      fontSize: 11,
                      cursor: isCompressing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <Camera size={12} /> 更换
                  </button>
                  <button
                    type="button"
                    disabled={isCompressing}
                    onClick={() => setCoverImage('')}
                    style={{
                      background: 'rgba(230,0,0,0.75)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '4px 8px',
                      fontSize: 11,
                      cursor: isCompressing ? 'not-allowed' : 'pointer'
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !isCompressing && fileInputRef.current?.click()}
                style={{
                  height: 110,
                  border: '2px dashed #E0D4C5',
                  borderRadius: 16,
                  background: '#FAF5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7A6A5D'
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FFF0E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={18} color="#FF7417" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#3D2C20' }}>
                  点击拍照或上传美图
                </div>
                <div style={{ fontSize: 11, color: '#A39386' }}>
                  支持 JPG / PNG / 手机即时拍摄
                </div>
              </div>
            )}
          </div>

          {/* Dish Title */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
              菜品名称 *
            </label>
            <input
              type="text"
              required
              placeholder="例如：黑椒牛肉粒"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1.5px solid #F3E6D8',
                padding: '10px 12px',
                fontSize: 14,
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          {/* Meal Category Destination */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 6 }}>
              🎯 归类到哪个餐型：
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
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
                      borderRadius: 10,
                      padding: '6px 0',
                      fontSize: 12,
                      fontWeight: isSelected ? 800 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
              一句话简介
            </label>
            <input
              type="text"
              placeholder="例如：鲜嫩多汁，快手美味"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1.5px solid #F3E6D8',
                padding: '10px 12px',
                fontSize: 14,
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          {/* Cook Time & Calories */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                用时 (分钟)
              </label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1.5px solid #F3E6D8',
                  padding: '8px 12px',
                  fontSize: 14,
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                热量 (kcal)
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1.5px solid #F3E6D8',
                  padding: '8px 12px',
                  fontSize: 14,
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
          </div>

          {/* Cookware Switches */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setInductionFriendly(!inductionFriendly)}
              style={{
                flex: 1,
                border: inductionFriendly ? '1.5px solid #FF7417' : '1px solid #E0D4C5',
                background: inductionFriendly ? '#FFF0E5' : '#FFFFFF',
                color: inductionFriendly ? '#FF7417' : '#7A6A5D',
                borderRadius: 10,
                padding: '6px 8px',
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
                borderRadius: 10,
                padding: '6px 8px',
                fontSize: 12,
                fontWeight: riceCookerFriendly ? 800 : 500,
                cursor: 'pointer'
              }}
            >
              🍚 适合电饭煲: {riceCookerFriendly ? '是' : '否'}
            </button>
          </div>

          {/* Section: Ingredients */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20' }}>
                所需食材清单
              </label>
              <button
                type="button"
                onClick={handleAddIngredientRow}
                style={{
                  background: '#FFF0E5',
                  border: 'none',
                  color: '#FF7417',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Plus size={14} /> 添加一行
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ingredients.map((ing, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="食材名称"
                    value={ing.name}
                    onChange={(e) => {
                      const copy = [...ingredients];
                      copy[idx].name = e.target.value;
                      setIngredients(copy);
                    }}
                    style={{
                      flex: 1.5,
                      borderRadius: 10,
                      border: '1.5px solid #F3E6D8',
                      padding: '6px 10px',
                      fontSize: 13,
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="用量(如200克)"
                    value={ing.amount}
                    onChange={(e) => {
                      const copy = [...ingredients];
                      copy[idx].amount = e.target.value;
                      setIngredients(copy);
                    }}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      border: '1.5px solid #F3E6D8',
                      padding: '6px 10px',
                      fontSize: 13,
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#FF3B30',
                        cursor: 'pointer',
                        padding: 4
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Steps */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20' }}>
                烹饪步骤
              </label>
              <button
                type="button"
                onClick={handleAddStepRow}
                style={{
                  background: '#FFF0E5',
                  border: 'none',
                  color: '#FF7417',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Plus size={14} /> 增加一步
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {steps.map((st, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #F3E6D8', borderRadius: 12, padding: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#FF7417' }}>
                      步骤 {idx + 1}
                    </div>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FF3B30',
                          cursor: 'pointer',
                          padding: 2
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="描述这一步的具体动作、火力或关键诀窍..."
                    value={st.description}
                    onChange={(e) => {
                      const copy = [...steps];
                      copy[idx].description = e.target.value;
                      setSteps(copy);
                    }}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      border: '1px solid #E0D4C5',
                      padding: 6,
                      fontSize: 13,
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '12px 0', fontSize: 14 }}
          >
            {initialData ? '保存修改' : '保存并加入菜谱库'}
          </button>
        </form>
      </div>
    </div>
  );
}
