import React from 'react'
import { NavBar, ErrorAlert, SuccessAlert , ModalTableFilter} from "../../components";
import { useForm, useAxios } from "../../hooks";
import { newUsuario, newPut } from "../../helpers";

const usuarioUrl = 'http://localhost:8000/usuarios';

const URIS = {
  usuario: 'http://localhost:8000/api/usuarios',
  permisos: 'http://localhost:8000/api/permisos',
  updatePermisos: 'http://localhost:8000/api/usuarios/permisos'
}

export const Usuarios = () => {
  
  const {formState, onInputChange, onResetForm, nombre, usuario, password, user, permiso} = useForm({
    nombre: '',
    usuario: '',
    password: '',
    user: {id: ''},
    permiso: {id: ''},
  });  

  const usuarios = useAxios(URIS.usuario,'get');
  const permisos = useAxios(URIS.permisos,'get');
  
  const crearUsuario = (usuario, password, nombre) => {
    if(usuario == '' || password == '' || nombre == '') {
      ErrorAlert({text: 'Verifique los campos que se solicitan'});
      return;
    }

    const response = newUsuario('http://localhost:8000/api/usuarios', {
      "nombreUsuario" : usuario,
      "nombre" : nombre,
      "password" : password,
      "estatus" : 1,
    });

    if(response.estatus != 'FAIL') {
      ErrorAlert({text: response.message});
    }

    SuccessAlert({text: response.message})
    onResetForm();
  }

  const guardarPermisos = () => {
    if(user.id == '' || permiso.id == '') {
      console.log("paso");
      ErrorAlert({text: "Seleccione Los Campos Necesarios"})
      return;
    }
    const paylaod = {
      permiso: permiso.id,
      idUsuario: user.id
    }

    const data = newPut(URIS.updatePermisos, paylaod);

    if(data.estatus == 'FAIL') {
      ErrorAlert({text: data.message});
      return;
    }
    console.log({user: user, permiso: permiso});
    SuccessAlert({text: data.message});
    
  }

  return (
    <div className='container-fluid bg-dark p-0' style={{height: '100%'}}>
        <NavBar/>

        <div className='container-fluid d-flex flex-column justify-content-center mt-5'>
          <div className='container bg-light rounded p-5 mb-5' style={{maxWidth: '40rem'}}>
            <div className='d-flex flex-column justify-content-center'>
              <h1><i className="bi bi-person-add me-2"></i>Nuevo Usuario</h1>
              <div className='row g-0 mb-3 text-center'>
                <div className='col-sm-6 col-md-12 mb-3'>
                  <div className='container input-group'>
                    <span className='input-group-text'><i className="bi bi-person-circle"></i></span>
                    <input 
                      className='form-control'
                      placeholder='Nombre'
                      name='nombre'
                      value={nombre}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className='col-sm-6 col-md-6 mb-3'>
                  <div className='container input-group'>
                    <span className='input-group-text'><i className="bi bi-person-vcard-fill"></i></span>
                    <input 
                      className='form-control'
                      placeholder='Nombre de Usuario'
                      name='usuario'
                      value={usuario}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className='col-6 col-md-6 mb-3'>
                  <div className='container input-group'>
                    <span className='input-group-text'><i className="bi bi-key-fill"></i></span>
                    <input 
                      className='form-control'
                      placeholder='Contrasena'
                      type={'password'}
                      name='password'
                      value={password}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <button 
                  className='btn btn-success'
                  onClick={()=> crearUsuario(usuario, password, nombre)}
                >Crear Usuario</button>
              </div>
            </div>  
          </div>
          <div className='container bg-light rounded p-5' style={{maxWidth: '40rem'}}>
            <div className='d-flex flex-column justify-content-center'>
              <h1><i className="bi bi-lock"></i>Permisos</h1>
              <div className='row g-0 mb-3 text-center'>
                
                <div className='col-sm-6 col-md-6 mb-3'>
                  <div className='container input-group'>
                    <ModalTableFilter 
                      titulo='Usuarios'
                      target='m_usaurio'
                      registros={usuarios.data}
                      onClickRow={(registro) => onInputChange({
                        target: {
                          name: "user",
                          value: registro
                        }
                      })}
                      config={{
                        size: '50rem'
                      }}
                    />
                    <input 
                      className='form-control'
                      placeholder='Usuario'
                      name='user'
                      value={user.nombreUsuario}
                      onChange={onInputChange}
                      disabled
                    />
                  </div>
                </div>
                <div className='col-6 col-md-6 mb-3'>
                  <div className='container input-group'>
                  <ModalTableFilter 
                      titulo='Permisos'
                      target='m_permiso'
                      registros={permisos.data}
                      onClickRow={(registro) => onInputChange({
                        target: {
                          name: "permiso",
                          value: registro
                        }
                      })}
                      config={{
                        filterBy: 'id'
                      }}
                    />
                    <input 
                      className='form-control'
                      placeholder='Permisos'
                      name='permiso'
                      value={permiso.descripcion}
                      onChange={onInputChange}
                      disabled
                    />
                  </div>
                </div>
                <button 
                  className='btn btn-success'
                  onClick={guardarPermisos}
                >Guardar Permisos</button>
              </div>
            </div>  
          </div>
        </div>
    </div>
  )
}
