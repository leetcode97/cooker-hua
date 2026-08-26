import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/theme.css';
import './styles/app.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Crash Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍳</div>
          <h2 style={{ color: '#3D2C20' }}>应用加载更新中...</h2>
          <p style={{ color: '#7A6A5D', fontSize: 13, marginBottom: 20 }}>
            发现数据缓存不匹配，点击下方按钮重置并刷新即可恢复！
          </p>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('cookoo_universal_db_v1');
              } catch (e) {}
              window.location.reload();
            }}
            style={{
              background: '#FF7417',
              color: 'white',
              border: 'none',
              borderRadius: 20,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            一键修复并重新加载
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
