import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import { LoginScreen } from '../Components/auth/LoginScreen'
import { CalendarScreen } from '../Components/calendar/CalendarScreen'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginScreen/> } />
            <Route path="/"  element={<CalendarScreen/>} />  
            <Route
                path="/*"
                element={<Navigate to="/" />}
            />
        </Routes>
        
    </BrowserRouter>
  )
}
