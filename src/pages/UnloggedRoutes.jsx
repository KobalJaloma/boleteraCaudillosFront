import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CodigosTickets } from "../pages/publicos/CodigosTickets";


//NO FUNCIONAN LAS RUTAS PUBLICAS SE DEBE ARREGLAR
export const UnloggedRoutes = () => {
  return (
    <Routes>
        <Route path='/*' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/obtenerCodigo' element={<CodigosTickets />}/>
    </Routes>
  )
}
