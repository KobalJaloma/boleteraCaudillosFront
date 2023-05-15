import { Navigate, Route, Routes } from 'react-router-dom';
import { Tickets, Usuarios, Eventos, Recintos, Empresas, EnviarTickets} from './admin';
import { Escanear, Planos } from './modulos';
import { Reportes, ReporteTickets, ReporteEscaneo } from './reportes';
import { Home } from './Home';
import { Estadisticas } from "./Estadisticas";
import { PuntoVenta } from "./Venta";

export const HomeRoutes = () => {
  //RUTAS DE PANTALLAS
  return (
    <Routes>
        <Route path='/*' element={<Navigate  to='/home'/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/escanear' element={<Escanear/>}/>
        <Route path='/estadisticas' element={<Estadisticas/>}/>

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

        {/* Rutas de planos */}
        <Route path='/CreacionPlanos' element={<Planos/>}/>

        {/* PUNTO DE VENTA */}
        <Route path='/puntoVenta' element={<PuntoVenta/>}/>


    </Routes>
  )
}
