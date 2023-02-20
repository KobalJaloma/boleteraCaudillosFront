import { Navigate, Route, Routes } from 'react-router-dom';
import { Tickets, Usuarios } from './admin';
import { Escanear } from './modulos';
import { Reportes } from './reportes';
import { Home } from './Home';

export const HomeRoutes = () => {
  return (
    <Routes>
        <Route path='/*' element={<Navigate  to='/home'/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/usuarios' element={<Usuarios/>}/>
        <Route path='/reportes' element={<Reportes/>}/>
        <Route path='/escanear' element={<Escanear/>}/>
    </Routes>
  )
}
