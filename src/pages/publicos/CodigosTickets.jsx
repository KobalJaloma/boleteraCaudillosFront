import React, { useState } from 'react'
import { useForm } from "../../hooks";

export const CodigosTickets = () => {
    
    const { formState, onInputChange, onResetForm, codigo } = useForm({
        codigo: ''
    });

  
    return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
        <div className='container-lg d-flex justify-content-center align-items-center flex-column' style={{height: '80vh'}}>
          <div className='container-sm p-5 bg-dark' style={{maxWidth: '30rem'}}>
            <div className='container d-flex justify-content-center my-4'>
              <img 
                src='logos/Caudillo.png'
                style={{maxWidth: '20rem'}}
              />
            </div>
            <div className='container input-group'>
              <span className='input-group-text'><i className="bi bi-ticket-fill"></i></span>
              <input 
                className='form-control'
                placeholder='Id Ticket'
                name='idTicket'
                value={codigo}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div>
            <p className='text-white'>{idTicket}</p>
          </div>
        </div>
      </div>
  )
}
