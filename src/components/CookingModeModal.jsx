import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Zap, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CookingModeModal({ recipe, onClose, onFinishCooked }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerAlert, setTimerAlert] = useState('');

  const currentStep = recipe.steps[currentStepIdx] || recipe.steps[0];
  const totalSteps = recipe.steps.length;
  const progressPercent = Math.round(((currentStepIdx + 1) / totalSteps) * 100);

  // Initialize timer for current step
  useEffect(() => {
    if (currentStep && currentStep.duration) {
      setSecondsLeft(currentStep.duration * 60);
      setIsTimerRunning(false);
    }
  }, [currentStepIdx, recipe]);

  // Timer ticker
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({ particleCount: 80, spread: 70 });
      setTimerAlert(`🔔 步骤 ${currentStepIdx + 1} 计时完成！进入下一步！`);
      setTimeout(() => setTimerAlert(''), 4000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextStep = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      // Completed all steps!
      confetti({ particleCount: 120, spread: 100 });
      onFinishCooked && onFinishCooked(recipe);
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(20, 15, 10, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    }}>
      <div style={{
        background: '#FAF5EE',
        borderRadius: 24,
        width: '100%',
        maxWidth: 480,
        height: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Top Header */}
        <div style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #F3E6D8',
          background: '#FFFBF6'
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#3D2C20' }}>
              🍳 烹饪专注大字模式 · {recipe.title}
            </div>
            <div style={{ fontSize: 11, color: '#7A6A5D', marginTop: 1 }}>
              步骤 {currentStepIdx + 1} / {totalSteps}
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#F4EBE0',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#3D2C20" />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: 4, background: '#F3E6D8' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF8C2B, #FF6200)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Main Body */}
        <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <div>
            {/* Induction Power Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#FFF0E5',
              border: '1.5px solid #FF8C2B',
              color: '#D84315',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 16
            }}>
              <Zap size={16} fill="currentColor" />
              <span>当前电磁炉建议火力: {currentStep.powerLevel || '1200W-1400W 中火'}</span>
            </div>

            {/* Step Title */}
            <div style={{ fontSize: 22, fontWeight: 900, color: '#3D2C20', marginBottom: 12 }}>
              {currentStep.stepNumber}. {currentStep.title}
            </div>

            {/* Step Description (Large Font for Cooking!) */}
            <div style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: '#4E342E',
              background: '#FFFFFF',
              border: '1px solid #F3E6D8',
              borderRadius: 18,
              padding: 20,
              boxShadow: '0 4px 16px rgba(180,120,70,0.08)',
              marginBottom: 20
            }}>
              {currentStep.description}
            </div>

            {/* Pot Tip */}
            {recipe.potType && (
              <div style={{ fontSize: 12, color: '#8D6E63', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🍲 推荐锅具: {recipe.potType}</span>
              </div>
            )}
          </div>

          {/* Huge Step Timer Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE8A3 100%)',
            border: '1.5px solid #FFE082',
            borderRadius: 20,
            padding: 16,
            textAlign: 'center',
            marginBottom: 12
          }}>
            {timerAlert && (
              <div style={{ fontSize: 13, fontWeight: 800, color: '#E65100', marginBottom: 6 }}>
                {timerAlert}
              </div>
            )}
            
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 2, color: '#3E2723', fontFamily: 'monospace' }}>
              {formatTimer(secondsLeft)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 8 }}>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                style={{
                  background: isTimerRunning ? '#FF5722' : '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: 20,
                  padding: '8px 20px',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 10px rgba(255,152,0,0.3)'
                }}
              >
                {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                {isTimerRunning ? '暂停计时' : '开始计时'}
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsLeft(currentStep.duration ? currentStep.duration * 60 : 180);
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #F3E6D8',
                  borderRadius: 20,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#7A6A5D',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <RotateCcw size={14} /> 重置
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #F3E6D8',
          background: '#FFFBF6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12
        }}>
          <button
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            style={{
              flex: 1,
              background: currentStepIdx === 0 ? '#F5EBE0' : '#FFFFFF',
              border: '1.5px solid #F3E6D8',
              borderRadius: 24,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 700,
              color: currentStepIdx === 0 ? '#C4B5A5' : '#3D2C20',
              cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <ChevronLeft size={18} /> 上一步
          </button>

          <button
            onClick={handleNextStep}
            style={{
              flex: 1.5,
              background: 'linear-gradient(135deg, #FF8A29 0%, #FF6200 100%)',
              border: 'none',
              borderRadius: 24,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 800,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 6px 16px rgba(255,116,23,0.35)'
            }}
          >
            {currentStepIdx < totalSteps - 1 ? (
              <>下一步 <ChevronRight size={18} /></>
            ) : (
              <>🎉 做完出锅打卡！<CheckCircle2 size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
