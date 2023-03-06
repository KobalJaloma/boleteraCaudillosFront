import { NavLink } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from "../auth/context/AuthContext";

export const NavBar = React.memo(() => {

    const { logout, user} = useContext(AuthContext);

    const restrict = () => {
        //PERMISO 1 ES ADMIN
        console.log(user);
        if(user.permiso == 1) {
            return false
        }
        return true
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
            <NavLink className='navbar-brand' to='/'>
                <img src="logos/CaudillosOro.png" className="img-fluid" style={{maxWidth: '10rem'}}/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <NavLink className='nav-item nav-link' to='/home'>
                    Home
                </NavLink>
                <NavLink className='nav-item nav-link' to='/escanear'>
                    Escanear
                </NavLink>
                <NavLink className='nav-item nav-link' to='/tickets' hidden={restrict()}>
                    Generar Tickets
                </NavLink>
                <NavLink className='nav-item nav-link' to='/enviarTickets' hidden={restrict()}>
                    Asignar Tickets
                </NavLink>
                <li className="nav-item dropdown" hidden={restrict()}>
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Reportes
                    </a>
                    <ul className="dropdown-menu">
                        <NavLink className="dropdown-item text-black" to="/reporteTickets" style={{background: "white"}}>Reporte De Tickets</NavLink>
                        <NavLink className="dropdown-item text-black" to="/reportes" style={{background: "white"}}>Recintos</NavLink>
                        <li><hr className="dropdown-divider" /></li>
                    </ul>
                </li>
                <li className="nav-item dropdown" hidden={restrict()}>
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administracion
                    </a>
                    <ul className="dropdown-menu">
                        <NavLink className="dropdown-item text-black" to="/CreacionEventos" style={{background: "white"}}>Eventos</NavLink>
                        <NavLink className="dropdown-item text-black" to="/CreacionRecintos" style={{background: "white"}}>Recintos</NavLink>
                        <li><hr className="dropdown-divider" /></li>
                        <NavLink className="dropdown-item text-black" to="/usuarios" style={{background: "white"}}>Usuarios</NavLink>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
});
