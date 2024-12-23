import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Routes/Router'
createRoot(document.getElementById('root')).render(
  <div>
    <Router/>
  </div>
)