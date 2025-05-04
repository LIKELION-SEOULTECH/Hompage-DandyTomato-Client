// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App'
import { worker } from './mocks/browser'

if (import.meta.env.MODE === 'development') {
    worker.start()
}

createRoot(document.getElementById('root')!).render(
    <>
        <App />
    </>
)
