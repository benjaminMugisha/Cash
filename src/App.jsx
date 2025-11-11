import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
    </Routes>
  )
}

export default App;