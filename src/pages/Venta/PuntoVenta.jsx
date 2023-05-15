import React from 'react'
import { NavBar } from "../../components";

export const PuntoVenta = () => {
  return (
    <div className='container-fluid p-0 m-0'>
        <NavBar />
        <div className='container-fluid d-flex align-items-center justify-content-center' style={{height: '80vh'}}>
            <div className='container bg-dark p-5 gradient-bg-animation d-flex align-items-center justify-content-center' style={{height: "10rem"}}>
                <h1 className='text-center text-light'>PROXIMAMENTE PUNTO DE VENTA</h1>
            </div>
        </div>
    </div>
  )
}
