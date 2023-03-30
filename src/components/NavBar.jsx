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
        <div className="container-fluid">
            <NavLink className='navbar-brand' to='/'>
                <img src="logos/CaudillosOro.png" className="img-fluid" style={{maxWidth: '10rem'}}/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <NavLink className='nav-item nav-link' to='/home'>
                        Home
                    </NavLink>
                    <NavLink className='nav-item nav-link' to='/escanear'>
                        Escanear
                    </NavLink>
                    
                    <li className="nav-item dropdown" hidden={restrict()}>
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tickets
                        </a>
                        <ul className="dropdown-menu">
                            <NavLink className="dropdown-item text-black" to="/tickets" style={{background: "white"}}>Generar Tickets</NavLink>
                            <NavLink className="dropdown-item text-black" to="/enviarTickets" style={{background: "white"}}>Enviar Tickets</NavLink>
                        </ul>
                    </li>
                    <li className="nav-item dropdown" hidden={restrict()}>
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes
                        </a>
                        <ul className="dropdown-menu">
                            <li><h6 className="ms-2 text-warning">Reportes</h6></li>
                            <li><hr className="dropdown-divider" /></li>
                            <NavLink className="dropdown-item text-black" to="/reporteTickets" style={{background: "white"}}>Reporte De Tickets</NavLink>
                            <NavLink className="dropdown-item text-black" to="/reporteEscaneo" style={{background: "white"}}>Reporte De Escaneos</NavLink>
                            <NavLink className="dropdown-item text-black" to="/reportes" style={{background: "white"}}>Recintos</NavLink>
                            <li><hr className="dropdown-divider" /></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown" hidden={restrict()}>
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Administracion
                        </a>
                        <ul className="dropdown-menu">
                            <li><h6 className="ms-2 text-primary">Creacion</h6></li>
                            <li><hr className="dropdown-divider" /></li>
                            <NavLink className="dropdown-item text-black" to="/CreacionEventos" style={{background: "white"}}>Eventos</NavLink>
                            <NavLink className="dropdown-item text-black" to="/CreacionRecintos" style={{background: "white"}}>Recintos</NavLink>
                            <NavLink className="dropdown-item text-black" to="/CreacionEmpresas" style={{background: "white"}}>Empresas</NavLink>
                            <NavLink className="dropdown-item text-black" to="/usuarios" style={{background: "white"}}>Usuarios</NavLink>
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-dark" onClick={logout}><i className="bi bi-box-arrow-right"></i></button>
            </div>
        </div>
        </nav>
    )
});
