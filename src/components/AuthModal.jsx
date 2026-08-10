import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Sparkles, Check, Cloud, AlertCircle, Settings, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { signInWithEmail, signUpWithEmail, signInWithGitHub } from '../services/cloudSyncService';
import { getSupabaseConfig, saveSupabaseConfig } from '../services/supabaseClient';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup' | 'config'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Custom Supabase configuration state
  const curConfig = getSupabaseConfig();
  const [customUrl, setCustomUrl] = useState(curConfig.url);
  const [customKey, setCustomKey] = useState(curConfig.key);
  const [configSaved, setConfigSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('请填写邮箱和密码！');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('密码长度至少为 6 位字符！');
      return;
    }

    setIsLoading(true);

    try {
      if (activeTab === 'signin') {
        const data = await signInWithEmail(email.trim(), password.trim());
        setIsLoading(false);
        if (data && data.user) {
          confetti({ particleCount: 80, spread: 70 });
          setSuccessMessage('🎉 登录成功！正在同步云端数据...');
          setTimeout(() => {
            onLoginSuccess && onLoginSuccess(data.user);
            onClose();
          }, 800);
        }
      } else if (activeTab === 'signup') {
        const data = await signUpWithEmail(email.trim(), password.trim());
        setIsLoading(false);
        confetti({ particleCount: 80, spread: 70 });
        setSuccessMessage('✨ 注册成功！已自动开启多端云同步！');
        setTimeout(() => {
          if (data && data.user) {
            onLoginSuccess && onLoginSuccess(data.user);
          }
          onClose();
        }, 1000);
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Auth error:', err);
      let msg = err.message || '操作失败，请检查网络或配置！';
      if (msg.includes('Invalid login credentials')) {
        msg = '账号或密码错误，请核对后再试！';
      } else if (msg.includes('User already registered')) {
        msg = '该邮箱已注册，请直接切换到【登录账号】！';
      }
      setErrorMessage(msg);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGitHub();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'GitHub 登录初始化失败！');
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveSupabaseConfig(customUrl, customKey);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 120 }}>
      <div className="modal-content-drawer" style={{ height: '88vh', maxHeight: '88vh' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cloud size={20} color="#FF7417" />
            开启多端实时云同步
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px 80px' }}>
          
          {/* Subtitle Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF0E5 0%, #FFF8F0 100%)',
            border: '1px solid #F6DFCB',
            borderRadius: 16,
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <div style={{ fontSize: 24 }}>☁️</div>
            <div style={{ fontSize: 12, color: '#7A6A5D', lineHeight: 1.4 }}>
              登录后，手机端拍照记录的菜谱、打卡历史与收藏，将在<b>电脑端与多台设备间秒级全自动同步</b>！
            </div>
          </div>

          {/* Segmented Switcher */}
          <div style={{ display: 'flex', background: '#F4EBE0', borderRadius: 14, padding: 3, gap: 4, marginBottom: 18 }}>
            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
              style={{
                flex: 1,
                border: 'none',
                background: activeTab === 'signin' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'signin' ? '#FF7417' : '#7A6A5D',
                fontWeight: activeTab === 'signin' ? 800 : 600,
                fontSize: 13,
                padding: '8px 0',
                borderRadius: 10,
                cursor: 'pointer',
                boxShadow: activeTab === 'signin' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              登录账号
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
              style={{
                flex: 1,
                border: 'none',
                background: activeTab === 'signup' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'signup' ? '#FF7417' : '#7A6A5D',
                fontWeight: activeTab === 'signup' ? 800 : 600,
                fontSize: 13,
                padding: '8px 0',
                borderRadius: 10,
                cursor: 'pointer',
                boxShadow: activeTab === 'signup' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              快速注册
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('config'); setErrorMessage(''); }}
              style={{
                flex: 1,
                border: 'none',
                background: activeTab === 'config' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'config' ? '#FF7417' : '#7A6A5D',
                fontWeight: activeTab === 'config' ? 800 : 600,
                fontSize: 13,
                padding: '8px 0',
                borderRadius: 10,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                boxShadow: activeTab === 'config' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <Settings size={12} /> 云端配置
            </button>
          </div>

          {/* Error / Success Toast */}
          {errorMessage && (
            <div style={{
              background: '#FFEBEE',
              color: '#C62828',
              border: '1px solid #FFCDD2',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <AlertCircle size={15} color="#C62828" /> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div style={{
              background: '#E8F5E9',
              color: '#2E7D32',
              border: '1px solid #C8E6C9',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Check size={16} color="#2E7D32" /> {successMessage}
            </div>
          )}

          {/* Form Content */}
          {activeTab !== 'config' ? (
            <form onSubmit={handleSubmit}>
              
              {/* Email Input */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                  登录邮箱 *
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} color="#A39386" style={{ position: 'absolute', left: 12 }} />
                  <input
                    type="email"
                    required
                    placeholder="your_email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #F3E6D8',
                      padding: '10px 12px 10px 38px',
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                  登录密码 *
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} color="#A39386" style={{ position: 'absolute', left: 12 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="至少 6 位密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #F3E6D8',
                      padding: '10px 40px 10px 38px',
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#A39386'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ width: '100%', padding: '12px 0', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 14 }}
              >
                {isLoading ? (
                  <span>处理中...</span>
                ) : activeTab === 'signin' ? (
                  <span>🔑 立即登录并同步</span>
                ) : (
                  <span>✨ 免费注册并开启云同步</span>
                )}
              </button>

              {/* GitHub 1-Click OAuth */}
              <div style={{ textAlign: 'center', margin: '14px 0 10px', fontSize: 12, color: '#A39386', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#F0E5D8', zIndex: 0 }} />
                <span style={{ background: '#FFFBF6', padding: '0 10px', position: 'relative', zIndex: 1 }}>
                  或者使用第三方一键登录
                </span>
              </div>

              <button
                type="button"
                onClick={handleGitHubLogin}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '10px 0',
                  borderRadius: 12,
                  border: '1.5px solid #E0D0C0',
                  background: '#FFFFFF',
                  color: '#333333',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                使用 GitHub 账号一键登录
              </button>
            </form>
          ) : (
            /* Custom Supabase Config Tab */
            <form onSubmit={handleSaveConfig}>
              <div style={{ fontSize: 12, color: '#7A6A5D', marginBottom: 12 }}>
                如果你有自己的 Supabase 项目，可在此直接填入 Project URL 和 Anon Key。
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  required
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ width: '100%', borderRadius: 10, border: '1.5px solid #F3E6D8', padding: '8px 10px', fontSize: 12 }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
                  Supabase Anon Key
                </label>
                <input
                  type="text"
                  required
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  style={{ width: '100%', borderRadius: 10, border: '1.5px solid #F3E6D8', padding: '8px 10px', fontSize: 12 }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '10px 0', fontSize: 13, fontWeight: 800 }}
              >
                {configSaved ? '✅ 配置已更新并生效！' : '保存云端配置'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
