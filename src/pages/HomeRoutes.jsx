import { Navigate, Route, Routes } from 'react-router-dom';
import { Tickets, Usuarios, Eventos, Recintos, Empresas, EnviarTickets} from './admin';
import { Escanear } from './modulos';
import { Reportes, ReporteTickets, ReporteEscaneo } from './reportes';
import { Home } from './Home';

export const HomeRoutes = () => {
  //RUTAS DE PANTALLAS
  return (
    <Routes>
        <Route path='/*' element={<Navigate  to='/home'/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/escanear' element={<Escanear/>}/>

        {/* permisos de administrador  */}
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/usuarios' element={<Usuarios/>}/>
        <Route path='/enviarTickets' element={<EnviarTickets/>} />

        {/* Rutas de reportes */}
        <Route path='/reporteTickets' element={<ReporteTickets/>}/>
        <Route path='/reporteEscaneo' element={<ReporteEscaneo/>}/>
        <Route path='/reportes' element={<Reportes/>} />

        {/* rutas de administracion */}
        <Route path='/CreacionEventos' element={<Eventos/>}/>
        <Route path='/CreacionRecintos' element={<Recintos/>}/>
        <Route path='/CreacionEmpresas' element={<Empresas/>}/>
    </Routes>
  )
}
