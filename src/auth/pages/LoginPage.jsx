import React from 'react'
import { useForm } from '../../hooks'

export const LoginPage = () => {

  const {formState, onInputChange, onResetForm , password, username} = useForm({
    username: '',
    password: '',
  });

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark' style={{height: '100vh'}}>
      <div className='container bg-white py-5 rounded' style={{maxWidth: '40rem'}}>
          <div className='container-sm d-flex justify-content-center mb-4' >
            <img src='logos/Caudillo.png' className='img-fluid mb-4' style={{width: '80%'}}/>
          </div>
          <form className='container-fluid f-2'>
            <div className='d-flex flex-column align-items-center'>
                <div className='mb-3 container-fluid input-group'>
                  <span className='input-group-text'><i className="bi bi-person-circle"></i></span>
                  <input 
                    className='form-control'
                    placeholder='Usuario'
                    name='username'
                    value={username}
                    onChange={onInputChange}
                    />
                </div>
                <div className='mb-3 d-flex container-fluid input-group'>
                  <span className='input-group-text'><i className="bi bi-pass"></i></span>
                  <input 
                    className='form-control'
                    placeholder='Contraseña'
                    type={'password'}
                    name='password'
                    value={password}
                    onChange={onInputChange}
                    /> 
                </div>
                <div className='mb-3 d-flex'>
                  <button type='button' className='btn btn-primary px-5'> Login</button>
                </div>
            </div>
          </form>
      </div>
    </div>
  )
}
