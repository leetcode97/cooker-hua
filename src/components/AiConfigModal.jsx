import React, { useState, useEffect } from 'react';
import { X, Key, Sparkles, Check, Globe, ShieldCheck } from 'lucide-react';

const API_BASE = window.location.port === '5173' ? 'http://localhost:3001/api' : '/api';

const PRESETS = [
  {
    name: 'DeepSeek (极力推荐 · 性价比高)',
    apiBase: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    hint: '从 platform.deepseek.com 获取'
  },
  {
    name: 'Kimi (Moonshot AI)',
    apiBase: 'https://api.moonshot.cn/v1',
    model: 'moonshot-v1-8k',
    hint: '从 platform.moonshot.cn 获取'
  },
  {
    name: '通义千问 (Qwen / DashScope)',
    apiBase: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus',
    hint: '从 dashscope.aliyun.com 获取'
  },
  {
    name: 'OpenAI (GPT-4o mini)',
    apiBase: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    hint: '从 platform.openai.com 获取'
  }
];

export default function AiConfigModal({ onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [apiBase, setApiBase] = useState('https://api.deepseek.com/v1');
  const [model, setModel] = useState('deepseek-chat');
  const [hasKey, setHasKey] = useState(false);
  const [maskedKey, setMaskedKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/config`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.config) {
          setApiBase(res.config.apiBase || 'https://api.deepseek.com/v1');
          setModel(res.config.model || 'deepseek-chat');
          setHasKey(res.config.hasKey);
          setMaskedKey(res.config.maskedKey || '');
        }
      })
      .catch(() => {});
  }, []);

  const handleApplyPreset = (preset) => {
    setApiBase(preset.apiBase);
    setModel(preset.model);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    fetch(`${API_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, apiBase, model })
    })
      .then(res => res.json())
      .then(res => {
        setIsSaving(false);
        if (res.success) {
          setSaveSuccess(true);
          setTimeout(() => {
            setSaveSuccess(false);
            onClose();
          }, 1000);
        }
      })
      .catch(() => {
        setIsSaving(false);
        alert('保存失败，请检查本地后台服务');
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-drawer" style={{ height: '90vh', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={20} color="#FF7417" />
            配置 AI 实时大模型接口
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '16px 20px 80px' }}>
          <div style={{ fontSize: 13, color: '#7A6A5D', marginBottom: 14, lineHeight: 1.5 }}>
            绑定你的大模型 API Key（支持 <b>DeepSeek / Kimi / 通义千问 / OpenAI</b> 等），开启 100% 实时真实的联网食材灵感生成与智能菜谱解析！
          </div>

          {/* Presets */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#3D2C20', marginBottom: 6 }}>
              ⚡ 快速套用主流大模型：
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    background: apiBase === p.apiBase ? '#FFF0E5' : '#FFFFFF',
                    border: apiBase === p.apiBase ? '1.5px solid #FF7417' : '1px solid #F3E6D8',
                    borderRadius: 10,
                    padding: '8px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#3D2C20' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#A39386' }}>{p.hint}</div>
                  </div>
                  {apiBase === p.apiBase && <Check size={16} color="#FF7417" />}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
              API Key (密钥) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder={hasKey ? `当前已保存: ${maskedKey} (输入可覆盖)` : 'sk-xxxxxxxxxxxxxxxxxxxxxxxx'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1.5px solid #F3E6D8',
                  padding: '10px 12px',
                  fontSize: 13,
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: '#A39386', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={14} color="#4CAF50" /> 密钥仅保存在你电脑本地的 <code>data/config.json</code> 中，绝不上传任何第三方。
            </div>
          </div>

          {/* API Base URL */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
              API Base URL (接口地址)
            </label>
            <input
              type="text"
              required
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1.5px solid #F3E6D8',
                padding: '10px 12px',
                fontSize: 13,
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          {/* Model Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#3D2C20', display: 'block', marginBottom: 4 }}>
              Model Name (模型名称)
            </label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1.5px solid #F3E6D8',
                padding: '10px 12px',
                fontSize: 13,
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSaving}
            style={{ width: '100%', padding: '12px 0', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            {isSaving ? '正在保存...' : saveSuccess ? '✅ 保存成功！' : '保存 AI 接口配置'}
          </button>
        </form>
      </div>
    </div>
  );
}
