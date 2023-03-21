import React, { useState, useContext, Component } from 'react'
import { ModalMensaje, NavBar, ModalTableFilter, ErrorAlert, SuccessAlert } from '../../components';
import { useAxios, useForm } from '../../hooks';
import { newPost } from "../../helpers";
import { AuthContext } from '../../auth/context';

const env = import.meta.env;
//Peticiones recurrentes en esta pantalla
const api = {
  eventos : `${env.VITE_REACT_API_ROUTE}api/eventos`,
  tickets: `${env.VITE_REACT_API_ROUTE}api/tickets`
}

export const Tickets = () => {
  //Extraer el usuario logeado con el contexto
  const { user } = useContext(AuthContext);

  const { formState, onInputChange, onResetForm, tickets, evento } = useForm({
    tickets: 0,
    evento: {id: '', nombre: '', fk_recinto: '', fechaHora: ''}
  });

  const [qrDOM, setqrDOM] = useState((<p>hola mundo</p>));

  const [inProgress, setInProgress] = useState(false);
  
  const generarTickets = async() => {
    if(tickets == '' || tickets == 0 || evento.id == '') {
      ErrorAlert({text: 'Verifique Todos Los Campos Solicitados'});
      return;
    }

    const payload = {
      cantidad: tickets,
      evento: evento.id,
      usuario: user.id
    }

    setInProgress(true);
    const response = await newPost(api.tickets, payload);


    if(response.estatus == 'FAIL') {
      ErrorAlert({text: response.message});
      setInProgress(false);
      return;
    }

    setInProgress(false);
    SuccessAlert({text: response.message});
    
  }

  const { data, isLoading } = useAxios(api.eventos);

   
  return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
      <NavBar />
      
      <div className='container-fluid d-flex flex-column justify-content-center mt-5'>
        <div className='container-fluid bg-light p-5 mb-5 rounded' style={{maxWidth: '40rem'}}>
          <h1><i className="bi bi-ticket-fill"></i> Generar Tickets</h1>
          {
            inProgress ? (<h3 className='text-warning'>Generando Tickets...</h3>) 
            : (<></>)
          }
          <div className='d-flex flex-column justify-content-center'>
            <div className='row g-0 text-center '>
              <div className='col-6 col-md-5  ms-3'>
                <input
                  type={'number'}
                  className='form-control mb-4 '
                  placeholder='Numero de Tickets'
                  name='tickets'
                  value={tickets}
                  onChange={onInputChange}
                />
              </div>
              <div className='col-6 col-md-5 ms-3'>
                <div className='input-group'>  
                  <ModalTableFilter
                    titulo={'Eventos'}
                    target={'eventos'}
                    registros={data}
                    onClickRow={(registro)=> {onInputChange({
                      target: {
                        name: 'evento',
                        value: registro
                      }
                    })}}
                    config = {{
                      size : "60rem", 
                      buttonColor : "primary"
                    }} 
                    
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Evento" 
                    name='evento'
                    value={evento.nombre}
                    disabled
                  />
                </div>
              </div>
            </div>
            <button className='btn btn-primary' onClick={generarTickets} disabled={inProgress}>Generar</button>
          </div>
        </div>
  
      </div>
    </div>
  )
}
