import { ThemeProvider } from '@mui/material'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'
import { lightTheme } from './theme'
import './main.css'

import '@fontsource/anonymous-pro'
import '@fontsource/anonymous-pro/700.css'
import '@fontsource/anonymous-pro/700-italic.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
