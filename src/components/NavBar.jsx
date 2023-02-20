import { NavLink } from "react-router-dom"
import React from 'react'

export const NavBar = React.memo(() => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
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
            <NavLink className='nav-item nav-link' to='/tickets'>
                Generar Tickets
            </NavLink>
            <NavLink className='nav-item nav-link' to='/reportes'>
                Reportes
            </NavLink>
            <NavLink className='nav-item nav-link' to='/usuarios'>
                Usuarios
            </NavLink>
        </ul>
        </div>
    </div>
    </nav>
  )
});
