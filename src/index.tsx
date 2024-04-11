import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const root = document.getElementById('root') as HTMLElement;
const rootContainer = createRoot(root);

rootContainer.render(
  <Provider store={store}>
    <App />
  </Provider>
);