import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config'
import axios from 'axios' // ← Added the missing import

// Create and export the configured API instance so your other components can use it
export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)