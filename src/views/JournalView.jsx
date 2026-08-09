import React, { useState } from 'react';
import { Calendar as CalendarIcon, Flame, Plus, CheckCircle2, Award } from 'lucide-react';

export default function JournalView({ cookedHistory, onSelectRecipe, onOpenAddRecipe }) {
  const [selectedDay, setSelectedDay] = useState(7); // default 7th Aug

  const weekDays = [
    { day: '一', date: 3, label: '08-03' },
    { day: '二', date: 4, label: '08-04' },
    { day: '三', date: 5, label: '08-05' },
    { day: '四', date: 6, label: '08-06' },
    { day: '五', date: 7, label: '08-07', isToday: true },
    { day: '六', date: 8, label: '08-08' },
    { day: '日', date: 9, label: '08-09' },
  ];

  const totalCalories = cookedHistory.reduce((sum, item) => sum + (item.caloriesValue || 400), 0);

  return (
    <div style={{ padding: '16px 20px 80px' }}>
      <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#3D2C20', marginBottom: 16 }}>
        美食日志与打卡
      </div>

      {/* Week Calendar Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #F3E6D8',
        borderRadius: 20,
        padding: 16,
        boxShadow: '0 4px 12px rgba(180, 120, 70, 0.08)',
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CalendarIcon size={18} color="#FF7417" />
            2026 年 8 月第 1 周
          </div>
          <span style={{ fontSize: 12, color: '#FF7417', fontWeight: 700 }}>
            已打卡 {cookedHistory.length} 餐
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, textAlign: 'center' }}>
          {weekDays.map(item => {
            const isSelected = selectedDay === item.date;
            return (
              <div 
                key={item.date}
                onClick={() => setSelectedDay(item.date)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #FF8C2B 0%, #FF6500 100%)' : item.isToday ? '#FFF0E5' : '#FFFBF6',
                  color: isSelected ? 'white' : item.isToday ? '#FF7417' : '#3D2C20',
                  borderRadius: 12,
                  padding: '8px 0',
                  cursor: 'pointer',
                  border: item.isToday && !isSelected ? '1px solid #FF7417' : '1px solid #F3E6D8'
                }}
              >
                <div style={{ fontSize: 11, opacity: 0.8 }}>周{item.day}</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{item.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calorie Stats Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF9F2 0%, #FFEEDD 100%)',
        border: '1px solid #F7DFCA',
        borderRadius: 16,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: 20
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#7A6A5D' }}>今日摄入评估</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Flame size={20} color="#FF7417" fill="#FF7417" />
            {totalCalories} <span style={{ fontSize: 12, fontWeight: 600 }}>kcal</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#4CAF50', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Award size={16} /> 健康平衡范围
          </div>
          <div style={{ fontSize: 11, color: '#7A6A5D', marginTop: 2 }}>
            建议日摄入: 1800 - 2200 kcal
          </div>
        </div>
      </div>

      {/* Cooked History Timeline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#3D2C20' }}>
          🍽️ 今日已做美食 ({cookedHistory.length})
        </div>
        <button
          onClick={onOpenAddRecipe}
          style={{ background: 'none', border: 'none', color: '#FF7417', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
        >
          <Plus size={16} /> 记一笔
        </button>
      </div>

      {cookedHistory.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cookedHistory.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectRecipe(item)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #F3E6D8',
                borderRadius: 16,
                padding: 14,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <img
                src={item.coverImage}
                alt={item.title}
                style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#3D2C20' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#7A6A5D', margin: '2px 0' }}>
                  烹饪用时: {item.cookTime} · {item.calories}
                </div>
                <div style={{ fontSize: 11, color: '#4CAF50', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={12} /> 厨艺打卡成功 · 营养满满
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          border: '1.5px dashed #F3E6D8',
          borderRadius: 16,
          padding: 30,
          textAlign: 'center',
          color: '#A39386'
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🍳</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3D2C20' }}>今天还没有做菜记录</div>
          <div style={{ fontSize: 12, color: '#7A6A5D', marginTop: 4 }}>
            去首页抽一张灵感卡，做完后点击“记录做过”吧！
          </div>
        </div>
      )}
    </div>
  );
}
