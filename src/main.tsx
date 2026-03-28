import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import My21Landing from './components/my21/My21Landing.tsx';
import My21Today from './components/my21/My21Today.tsx';
import My21Progress from './components/my21/My21Progress.tsx';
import My21Admin from './components/my21/My21Admin.tsx';
import './index.css';
import './components/my21/my21.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/my21" element={<My21Landing />} />
        <Route path="/my21/today" element={<My21Today />} />
        <Route path="/my21/progress" element={<My21Progress />} />
        <Route path="/my21/admin" element={<My21Admin />} />
        {/* Redirect old sugar-cut-21 URLs */}
        <Route path="/sugar-cut-21" element={<Navigate to="/my21" replace />} />
        <Route path="/sugar-cut-21/*" element={<Navigate to="/my21" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
