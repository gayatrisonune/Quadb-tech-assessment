import React from 'react'
import Page1 from '../components/Page1'
import Card from '../components/Card'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page2 from '../components/Page2'
import Modal from '../components/Modal'
import Booking from '../components/Booking'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Page1 />} />
          <Route path='/show/:id' element={<Page2 />} />
          <Route path='/bookings' element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
