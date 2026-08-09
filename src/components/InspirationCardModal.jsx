import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, CheckCircle, Clock, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InspirationCardModal({ recipes, onClose, onSelectRecipe }) {
  const [filter, setFilter] = useState('all'); // all, quick, lowCal, spicy
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const getFilteredPool = () => {
    return recipes.filter(r => {
      if (filter === 'quick') return r.minutes <= 25;
      if (filter === 'lowCal') return r.caloriesValue <= 350;
      if (filter === 'spicy') return r.tags.includes('麻辣') || r.tags.includes('辣');
      return true;
    });
  };

  const drawCard = () => {
    setIsDrawing(true);
    setIsFlipped(false);
    
    setTimeout(() => {
      const pool = getFilteredPool();
      const randomDish = pool[Math.floor(Math.random() * pool.length)] || recipes[0];
      setCurrentRecipe(randomDish);
      setIsFlipped(true);
      setIsDrawing(false);
    }, 400);
  };

  useEffect(() => {
    drawCard();
  }, [filter]);

  const handleConfirm = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (currentRecipe) {
      onSelectRecipe(currentRecipe);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={20} color="#FF7417" />
            今天吃什么 · 灵感卡
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="inspiration-body">
          {/* Quick Filter Tags */}
          <div className="tags-scroll-container" style={{ width: '100%', justifyContent: 'center' }}>
            <button 
              className={`filter-tag-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              🎲 随机不限
            </button>
            <button 
              className={`filter-tag-btn ${filter === 'quick' ? 'active' : ''}`}
              onClick={() => setFilter('quick')}
            >
              ⚡ 快手菜
            </button>
            <button 
              className={`filter-tag-btn ${filter === 'lowCal' ? 'active' : ''}`}
              onClick={() => setFilter('lowCal')}
            >
              🥗 减脂轻食
            </button>
            <button 
              className={`filter-tag-btn ${filter === 'spicy' ? 'active' : ''}`}
              onClick={() => setFilter('spicy')}
            >
              🌶️ 下饭辣菜
            </button>
          </div>

          {/* 3D Flip Card Container */}
          <div className="card-flip-container">
            <div className={`card-flipper ${isFlipped ? 'flipped' : ''}`}>
              {/* Card Front (Mystery) */}
              <div className="card-face card-face-front">
                <div className="mystery-box-icon">🍱</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#3D2C20' }}>
                  抽取今日美食盲盒
                </div>
                <div style={{ fontSize: 12, color: '#7A6A5D', marginTop: 4 }}>
                  告别选择焦虑，为你精选一餐
                </div>
              </div>

              {/* Card Back (Result) */}
              <div className="card-face card-face-back">
                {currentRecipe && (
                  <>
                    <div className="result-img-box">
                      <img src={currentRecipe.coverImage} alt={currentRecipe.title} />
                    </div>
                    <div className="result-title">
                      {currentRecipe.title}
                    </div>
                    <div className="result-meta" style={{ display: 'flex', gap: 12, margin: '4px 0' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={14} color="#FF7417" /> {currentRecipe.cookTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Flame size={14} color="#FF7417" /> {currentRecipe.calories}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#7A6A5D', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {currentRecipe.subtitle}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="modal-actions-row">
            <button 
              className="btn-secondary"
              onClick={drawCard}
              disabled={isDrawing}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <RefreshCw size={16} className={isDrawing ? 'spin' : ''} />
              换一张
            </button>
            <button 
              className="btn-primary"
              onClick={handleConfirm}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <CheckCircle size={16} />
              就吃这个！
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
