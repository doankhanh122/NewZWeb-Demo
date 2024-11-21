import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Đảm bảo bạn import Provider
import store from './store'; // Import store từ `store/index.js`
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
