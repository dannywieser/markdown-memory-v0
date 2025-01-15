import { ThemeProvider } from '@mui/material'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'
import { lightTheme } from './theme'
import './main.css'

import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/400-italic.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
