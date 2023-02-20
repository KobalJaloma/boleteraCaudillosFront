import React from 'react'
import { NavBar } from '../../components';

export const Tickets = () => {
  return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw'}}>
      <NavBar />
      
      <div className='container-fluid d-flex flex-column justify-content-center mt-5'>
        <div className='container-fluid bg-light p-5 mb-5 rounded' style={{maxWidth: '40rem'}}>
          <h1>Generar Tickets</h1>
          <div className='d-flex flex-column justify-content-center'>
            <div className='row g-0 text-center '>

              <div className='col-sm-6 col-md-8 '>
                <input
                  className='form-control mb-4 '
                  placeholder='Numero de Tickets'
                />
              </div>
              <div className='col-6 col-md-4'>
                <div class="btn-group">
                  <button class="btn btn-success btn-md" type="button">
                    Evento
                  </button>
                  <button type="button" class="btn btn-lg btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <button className='dropdown-item'>Test</button>
                    <button className='dropdown-item'>Test1</button>
                    <button className='dropdown-item'>Test2</button>
                  </ul>
                </div>
              </div>
              
            </div>
            <button className='btn btn-primary' >Generar</button>
          </div>
        </div>

        <div className='container-fluid bg-light mb-5 p-5 rounded' style={{maxWidth: '40rem'}}>
          <h1 className='mb-4'>Generar Evento</h1>
          <div className='d-flex flex-column justify-content-center'>
            <div className='row g-0 text-center mb-3'>

              <div className='col-sm-6 col-md-8 '>
                <input
                  className='form-control mb-4 '
                  placeholder='Nombre del Evento'
                />
              </div>

              <div className='col-6 col-md-4'>
                <div className='container input-group'>
                  <span className='input-group-text'><i className="bi bi-calendar-event"></i></span>
                  <input 
                    className='form-control'
                    placeholder='Hora'
                  />
                </div>
              </div>
              
              <div className='col-6 col-md-6 '>
                <div className='container input-group'>
                  <span className='input-group-text'><i className="bi bi-signpost"></i></span>
                  <input 
                    className='form-control'
                    placeholder='Ciudad'
                  />
                </div>
              </div>

              <div className='col-6 col-md-6'>
                <div className='container input-group'>
                  <span className='input-group-text'><i className="bi bi-signpost"></i></span>
                  <input 
                    className='form-control'
                    placeholder='Municipio'
                  />
                </div>
              </div>

            </div>
            <button className='btn btn-primary' >Generar</button>  
          </div>
        </div>
       
      </div>
    </div>
  )
}
