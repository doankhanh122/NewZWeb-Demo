import React from 'react';
import App from './App';
import './index.css';

import ReactDOM from 'react-dom/client';  // Chú ý thay đổi import từ 'react-dom' thành 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
