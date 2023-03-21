import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../../hooks'
import { AuthContext } from '../context';
import { ModalTicket } from "../../components/modals";
export const LoginPage = () => {

  const {formState, onInputChange, onResetForm , setFormState ,password, username} = useForm({
    username: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const [estatus, setEstatus] = useState(0);

  const sesion = async(username, password) => {
    if(username != 0 && password != 0) {
      const state = await login(username, password);

      setEstatus(state);
    }
    
    console.log(estatus);
  }

  useEffect(() => {
    authError();
  }, [estatus]);


  //creacion de feedback visual del login
  const authError = () => {
    if(estatus == '[fail] usuario') {
      return(
        <p className='text-danger'>Usuario no Encontrado</p>
      )
    }
    if(estatus == '[fail] password') {
      return(
        <p className='text-danger'>Contrasena Erronea</p>
      )
    }
  }

  //PROVISIONAL
  const cambiarUsuario = (usuario) => {
      setFormState({
        ...formState,
        username: usuario,
        password: usuario
      });
      sesion(username, password)
  }

  return (
    <div className='d-flex justify-content-center align-items-center' 
      style={{
        height: '100vh', 
        backgroundImage: 'url("wallpapers/fondo-login2.jpg")', 
       
      }}
    >
      <div className='container py-5 rounded bg-white' style={{maxWidth: '40rem'}}>
          <div className='container-sm d-flex justify-content-center mb-4' >
            <img src='logos/Caudillo.png' className='img-fluid mb-4' style={{width: '80%'}}/>
          </div>
          <form className='container-fluid f-2'>
            <div className='d-flex flex-column align-items-center'>
                {
                  authError()
                }
                <div className='mb-3 container-fluid input-group'>
                  <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                  <input 
                    className={`form-control ${estatus == '[fail] usuario' ? 'border-danger border-3' : ''}`}
                    placeholder='Usuario'
                    name='username'
                    value={username}
                    onChange={onInputChange}
                    />
                </div>
                <div className='mb-3 d-flex container-fluid input-group'>
                  <span className="input-group-text"><i className="bi bi-pass"></i></span>
                  <input 
                    className={`form-control ${estatus == '[fail] password' ? 'border-danger border-3' : ''}`}
                    placeholder='Contraseña'
                    type={'password'}
                    name='password'
                    value={password}
                    onChange={onInputChange}
                    /> 
                </div>
                <div className='mb-3 d-flex'>
                  <button type='button' className='btn btn-primary px-5'
                    onClick={()=> sesion(username, password)}
                  > Login</button>
                </div>
                <div className='mb-3 d-flex justify-content-center' style={{alignSelf: 'center', width: '100%'}}>
                  {/* <ModalTicket /> */}
                  
                  {/* <button type='button' className='btn btn-dark px-5'
                    onClick={() => {}}
                  > <i class="bi bi-qr-code"></i></button> */}
                  {/* PARCHE PARA USAURIOS */}
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('1')} type="button">Usuario 1</button>
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('2')} type="button">Usuario 2</button>
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('3')} type="button">Usuario 3</button>
                </div>
                <div className='mb-3 d-flex justify-content-center' style={{alignSelf: 'center', width: '100%'}}>
                  {/* <ModalTicket /> */}
                  
                  {/* <button type='button' className='btn btn-dark px-5'
                    onClick={() => {}}
                  > <i class="bi bi-qr-code"></i></button> */}
                  {/* PARCHE PARA USAURIOS */}
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('4')} type="button">Usuario 4</button>
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('5')} type="button">Usuario 5</button>
                  <button className='btn btn-warning mx-1' onClick={() => cambiarUsuario('6')} type="button">Usuario 6</button>
                </div>
            </div>
          </form>
      </div>
    </div>
  )
}
