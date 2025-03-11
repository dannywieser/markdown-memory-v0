import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anonymous-pro'
import '@fontsource/anonymous-pro/700.css'
import '@fontsource/anonymous-pro/700-italic.css'

import App from './app/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
