import React from 'react';
import { ThemeProvider } from './context/Theme';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);