import React from 'react'
import { NavBar } from '../components';

export const Home = () => {
  return (
    <div className='container-fluid p-0 wallpaper-gradiant-blue' style={{height: '100vh', width: '100%'}}>
        <NavBar/>
        <div className='container-fluid d-flex justify-content-center align-items-center p-4' style={{height: '80vh'}}>
          <img src='logos/LogoCaudillos.png' style={{maxWidth: '90vw', maxHeight: '70vh'}}/>
        </div>
    </div>
  )
}
