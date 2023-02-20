import { useEffect, useState } from 'react';
import { NavBar } from '../../components';
import { useForm } from '../../hooks';

export const Escanear = () => {
  const [scaner, setScaner] = useState('Escanear');

  const { formState, onInputChange, onResetForm, idTicket } = useForm({
    idTicket: ''
  });

  useEffect(() => {
    console.log('el ticket es ' + idTicket);
  }, [idTicket]);

  
  return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
      <NavBar />
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
              value={idTicket}
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
