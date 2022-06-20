import './index.css'

import AppProvider from './AppProvider'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider />
        </BrowserRouter>
    </React.StrictMode>
)
reportWebVitals()
