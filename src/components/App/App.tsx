import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import Dashboard from '../Dashboard/Dashboard'
import OnThisDay from '../OnThisDay/OnThisDay'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<OnThisDay />} path="/on-this-day/:group/:date" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
