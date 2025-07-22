import { Provider as ChakraProvider } from '@markdown-memory/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import Dashboard from '../pages/Dashboard/Dashboard'
import Note from '../pages/Note/Note'
import OnThisDay from '../pages/OnThisDay/OnThisDay'
import '../../main.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Note />} path="/note/:noteId" />
            <Route element={<OnThisDay />} path="/on-this-day" />
            <Route element={<OnThisDay />} path="/on-this-day/:groupName" />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
