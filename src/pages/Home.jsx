import React from 'react'
import { NavBar } from '../components'

export const Home = () => {
  return (
    <div className='container-fluid p-0 bg-dark' style={{height: '100vh', width: '100%'}}>
        <NavBar/>
        <div className='container-fluid d-flex justify-content-center p-4'>
          <img src='logos/LogoCaudillos.png' style={{height: '80vh'}}/>
        </div>
    </div>
  )
}
