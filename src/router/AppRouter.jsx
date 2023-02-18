import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  return (
    <Routes >
        <Route path='/login' element = {
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }
        />
        
        <Route path='/*' element={
          <PrivateRoute>

          </PrivateRoute>
        }
        />
    </Routes>
  );
}
