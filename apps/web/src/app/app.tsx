import { theme } from '@markdown-memory/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { ThemeProvider } from 'react-jss'
import { BrowserRouter, Route, Routes } from 'react-router'

import Dashboard from '../pages/Dashboard/Dashboard'
import Note from '../pages/Note/Note'
import Today from '../pages/Today/Today'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Note />} path="/note/:noteId" />
            <Route element={<Today />} path="/today" />
            <Route element={<Today />} path="/today/:groupName" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
