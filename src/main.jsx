import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
createRoot(document.getElementById('root')).render(<App />)

// Notify the site owner of a visit (once per browser session; skipped on localhost)
try {
  if (!sessionStorage.getItem('visitSent') && !/^(localhost|127\.)/.test(location.hostname)) {
    sessionStorage.setItem('visitSent', '1')
    fetch('/api/visit', { method: 'POST', keepalive: true }).catch(() => {})
  }
} catch { /* storage blocked: skip */ }
