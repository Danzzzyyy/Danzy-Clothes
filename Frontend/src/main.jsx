import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminEntry from './AdminEntry.jsx'
import './index.css'

// Check if we're on the admin route
const isAdminRoute = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <AdminEntry /> : <App />}
  </StrictMode>,
)
