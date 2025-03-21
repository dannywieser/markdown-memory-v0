import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anonymous-pro'

import App from './app/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
