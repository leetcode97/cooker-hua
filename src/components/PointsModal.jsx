import React, { useState } from 'react';
import { X, Coins, Gift, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PointsModal({ points, setPoints, onClose }) {
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      setPoints(prev => prev + 50);
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Coins size={22} color="#FFB300" />
            信用点数与成就中心
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 20px 80px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE8A3 100%)',
            borderRadius: 20,
            padding: 20,
            border: '1px solid #FFE082',
            marginBottom: 20
          }}>
            <div style={{ fontSize: 13, color: '#795548' }}>当前可用信用点数</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#3D2C20', margin: '4px 0' }}>
              {points} <span style={{ fontSize: 16 }}>点</span>
            </div>
            <div style={{ fontSize: 11, color: '#8D6E63' }}>
              信用点数可用于解锁高级 AI 食材整理与每日专属定制计划
            </div>
          </div>

          {/* Daily Check-in Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #F3E6D8', borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#3D2C20' }}>📅 每日好好吃饭签到</div>
                <div style={{ fontSize: 12, color: '#7A6A5D' }}>连续签到奖励翻倍 +50点</div>
              </div>
              <button
                className={checkedIn ? 'btn-secondary' : 'btn-primary'}
                onClick={handleCheckIn}
                disabled={checkedIn}
                style={{ padding: '8px 16px', fontSize: 13 }}
              >
                {checkedIn ? '✅ 已签到' : '立即领 50点'}
              </button>
            </div>
          </div>

          {/* Points Task list */}
          <div style={{ textAlign: 'left', marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#3D2C20', marginBottom: 10 }}>
              🎯 做任务赚点数
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#FFFBF6', border: '1px solid #F3E6D8', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#3D2C20' }}>打卡记录一顿晚餐</div>
                  <div style={{ fontSize: 11, color: '#A39386' }}>每日首次打卡做过的菜 +30点</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FF7417' }}>+30 点</span>
              </div>

              <div style={{ background: '#FFFBF6', border: '1px solid #F3E6D8', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#3D2C20' }}>使用 AI 整理菜谱</div>
                  <div style={{ fontSize: 11, color: '#A39386' }}>智能结构化并保存 +40点</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FF7417' }}>+40 点</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
