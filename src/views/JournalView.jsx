import React, { useState } from 'react';
import { Calendar as CalendarIcon, Flame, Plus, CheckCircle2, Award, Utensils, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

export default function JournalView({ cookedHistory = [], onSelectRecipe, onOpenAddRecipe, onDeleteHistoryItem }) {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  
  // Generate current 7-day week starting from Monday
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() + mondayOffset);

  // Helper for local date string YYYY-MM-DD
  const getLocalDateStr = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const dayNames = ['一', '二', '三', '四', '五', '六', '日'];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);
    const dateStr = getLocalDateStr(d);
    const isToday = d.toDateString() === today.toDateString();
    return {
      dayName: dayNames[i],
      dateNum: d.getDate(),
      fullDate: dateStr,
      isToday
    };
  });

  const todayStr = getLocalDateStr(today);
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);



  const normalizeHistoryItem = (item) => {
    // 兼容老数据：如果缺失 date，或者 date 是老的 UTC 格式，强制转成本地时间字符串
    if (!item.date || item.date.includes('T')) {
      const d = item.timestamp ? new Date(item.timestamp) : new Date();
      return { ...item, date: getLocalDateStr(d) };
    }
    // 兼容部分带有时区偏移的旧日期字符串，如用 timestamp 强制重新格式化一次最安全
    if (item.timestamp) {
       return { ...item, date: getLocalDateStr(new Date(item.timestamp)) };
    }
    return item;
  };

  const historySafe = (Array.isArray(cookedHistory) ? cookedHistory : []).map(normalizeHistoryItem);
  
  // Strictly filter history for selected date. Do NOT fallback to all history.
  const displayHistory = historySafe.filter(item => item.date === selectedDateStr);

  const totalCalories = displayHistory.reduce((sum, item) => {
    const cal = typeof item.calories === 'string' ? parseInt(item.calories) : item.calories;
    return sum + (cal || 350);
  }, 0);

  return (
    <div style={{ padding: '16px 20px 90px' }}>
      <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 900, color: '#3D2C20', marginBottom: 14 }}>
        📅 美食日志与自炊打卡
      </div>

      {/* Week Calendar Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1.5px solid #F3E6D8',
        borderRadius: 22,
        padding: '16px 14px',
        boxShadow: '0 4px 16px rgba(180, 120, 70, 0.06)',
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CalendarIcon size={16} color="#FF7417" />
            {today.getFullYear()} 年 {today.getMonth() + 1} 月自炊周历
          </div>
          <span style={{ fontSize: 11, color: '#FF7417', fontWeight: 800, background: '#FFF0E5', padding: '2px 8px', borderRadius: 8 }}>
            累计打卡 {historySafe.length} 顿
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5, textAlign: 'center' }}>
          {weekDays.map(item => {
            const isSelected = selectedDateStr === item.fullDate;
            const hasLogOnDay = historySafe.some(h => h.date === item.fullDate);
            return (
              <div 
                key={item.fullDate}
                onClick={() => setSelectedDateStr(item.fullDate)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #FF7417 0%, #FF9800 100%)' : item.isToday ? '#FFF0E5' : '#FFFBF6',
                  color: isSelected ? 'white' : item.isToday ? '#FF7417' : '#3D2C20',
                  borderRadius: 14,
                  padding: '8px 0',
                  cursor: 'pointer',
                  border: isSelected ? 'none' : item.isToday ? '1.5px solid #FF7417' : '1px solid #F3E6D8',
                  boxShadow: isSelected ? '0 4px 10px rgba(255, 116, 23, 0.3)' : 'none',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: 10, opacity: isSelected ? 0.9 : 0.7 }}>周{item.dayName}</div>
                <div style={{ fontSize: 15, fontWeight: 900, marginTop: 2 }}>{item.dateNum}</div>
                {hasLogOnDay && (
                  <div style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: isSelected ? 'white' : '#4CAF50',
                    margin: '3px auto 0'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calorie Stats Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF9F2 0%, #FFEEDD 100%)',
        border: '1px solid #F7DFCA',
        borderRadius: 18,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#7A6A5D', fontWeight: 600 }}>
            {selectedDateStr === todayStr ? '今日摄入评估' : `${selectedDateStr.slice(5)} 摄入评估`}
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#3D2C20', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <Flame size={18} color="#FF7417" fill="#FF7417" />
            {totalCalories} <span style={{ fontSize: 11, fontWeight: 600 }}>kcal</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Award size={14} /> 均衡能量自炊
          </div>
          <div style={{ fontSize: 10, color: '#8D6E63', marginTop: 2 }}>
            健康一人食 · 控油少盐
          </div>
        </div>
      </div>

      {/* Cooked History Timeline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#3D2C20' }}>
          🍽️ 美食自炊记录 ({displayHistory.length})
        </div>
        <button
          onClick={onOpenAddRecipe}
          style={{
            background: '#FFF0E5',
            border: '1px solid #FFD0B0',
            color: '#FF7417',
            fontSize: 12,
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Plus size={14} /> 拍照片记一笔
        </button>
      </div>

      {displayHistory.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {displayHistory.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectRecipe(item)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #F3E6D8',
                borderRadius: 18,
                padding: 12,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <img
                src={item.coverImage}
                alt={item.title}
                style={{ width: 62, height: 62, borderRadius: 14, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20' }}>{item.title}</div>
                  <span style={{ fontSize: 10, color: '#A39386' }}>{item.date || '今日'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#7A6A5D', margin: '3px 0' }}>
                  用时: {item.cookTime} · {item.calories || '320 kcal'}
                </div>
                <div style={{ fontSize: 10, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700 }}>
                  <CheckCircle2 size={12} /> 自炊大厨打卡成功 · 营养美味
                </div>
              </div>
              {onDeleteHistoryItem && (
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
                    color: '#B0BEC5',
                    padding: 6,
                    cursor: 'pointer',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={16} color="#E57373" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          border: '1.5px dashed #F3E6D8',
          borderRadius: 20,
          padding: '30px 20px',
          textAlign: 'center',
          color: '#A39386'
        }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🍳</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#3D2C20' }}>今天还没有做菜记录</div>
          <div style={{ fontSize: 12, color: '#7A6A5D', marginTop: 4 }}>
            做完一道菜后点击“记录做过”，或点右上角拍照发菜谱！
          </div>
        </div>
      )}
    </div>
  );
}
