import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './features/Store.js';
import { AuthProvider } from './Context/auth.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Provider store={Store}>
          <ToastContainer />
          <App />
        </Provider>
      </Router>
    </AuthProvider>
  </StrictMode>
);
