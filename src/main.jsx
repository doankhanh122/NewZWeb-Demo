import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` instead of `react-dom`
import App from './App';
import { Provider } from 'react-redux';
import  store  from './store'; // Assuming your Redux store is set up
import zIndex from '@mui/material/styles/zIndex';
// Get the root element in your HTML
const rootElement = document.getElementById('root');

// Use `createRoot` to render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

