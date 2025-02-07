import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import Dashboard from '../Dashboard/Dashboard'
import OnThisDay from '../OnThisDay/OnThisDay'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<OnThisDay />} path="/on-this-day/:group/:date" />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
