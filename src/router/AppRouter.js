import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import { LoginScreen } from '../Components/auth/LoginScreen'
import { CalendarScreen } from '../Components/calendar/CalendarScreen'
import { startChecking } from '../redux/actions/auth';

export const AppRouter = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( startChecking() )
  }, [dispatch]);

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
