import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { configureStyle } from '@demo/ui';
import './index.css';

configureStyle({ prefix: 'myapp' });

createRoot(document.getElementById('root')!).render(<App />);
