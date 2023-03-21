import React, {useState} from 'react'
import { NavBar, ModalTableFilter, alert} from '../../components';
import { useForm, useAxios } from "../../hooks";
import { newPost } from "../../helpers";
//variable de estado
const env = import.meta.env;

const uri = {
    recintos: `${env.VITE_REACT_API_ROUTE}api/recintos`,
    eventos: `${env.VITE_REACT_API_ROUTE}api/eventos`
}

export const Eventos = () => {
    
    const {formState, onInputChange, onResetForm, recinto, evento, hora, fecha} = useForm({
        evento: "",
        hora: "",
        fecha: "",
        recinto: {}
    });
    const { data } = useAxios(uri.recintos, "get");

    const saveEvento = async() => {
        if(recinto == "" || evento == "" || hora == "" || fecha == "") {
            alert({
                title: 'UUPS',
                text: "Rellena todos los campos obligatorios",
                icon: "warning"
            });
            return null;
        }

        const payload = {
            nombre: evento,
            fechaHora: `${fecha} ${hora}`,
            fk_recinto: recinto.id,
            estatus: 1
        }
        const datos = await newPost(uri.eventos, payload);

        if(datos.estatus != "OK") {
            console.log(datos);
            console.log("hubo problema con el envio");
            alert({
                title: 'UUPS',
                text: "Hubo un problema al crear tu evento",
                icon: "warning"
            });
            return null;
        }
        onResetForm();
        alert({
            title: "Hecho",
            icon: "success",
            text: "Tu creacion de evento, ha sido exitosa"
        });
    }  
    

    return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
        <NavBar />

        <div className='container-fluid d-flex flex-column justify-content-center mt-5'>

            <div className='container-fluid bg-light mb-5 p-5 rounded' style={{maxWidth: '40rem'}}>
                <h1 className='mb-4'> <i className="bi bi-calendar3-event-fill"></i> Generar Evento</h1>
                <div className='d-flex flex-column justify-content-center'>
                    <div className='row g-0 text-center mb-3'>
                        <div className='col-sm-6 col-md-12 mb-3'>
                            <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-calendar-event"></i></span>
                            <input 
                                className='form-control'
                                placeholder='Nombre'
                                name='evento'
                                value={evento}
                                onChange={onInputChange}
                            />
                            </div>
                        </div>

                        <div className='col-6 col-md-6 mb-4'>
                            <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-calendar"></i></span>
                            <input 
                                className='form-control'
                                type={'date'}
                                name='fecha'
                                value={fecha}
                                onChange={onInputChange}
                            />
                            </div>
                        </div>
                        <div className='col-6 col-md-6 mb-4'>
                            <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-alarm"></i></span>
                            <input 
                                className='form-control'
                                type={'time'}
                                name='hora'
                                value={hora}
                                onChange={onInputChange}
                                
                            />
                            </div>
                        </div>

                        <div className='col-6 col-md-12 mb-4'>
                            <div className='container input-group'>
                            <ModalTableFilter
                                titulo="Registros"
                                target='m_recintos'
                                registros={data}
                                toDo={()=> {console.log('Todo click in recintos')}}
                                onClickRow={(registro)=> {onInputChange({
                                    target: {
                                        name: "recinto",
                                        value: registro
                                    }
                                }); console.log(formState)}}
                                config={{
                                    buttonColor: "primary",
                                }}
                            />
                            <input 
                                className='form-control'
                                placeholder='Recinto'
                                name='recinto'
                                value={recinto.nombre}
                                onChange={onInputChange}
                                disabled
                            />
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={saveEvento}>Guardar Evento</button>  
                </div>
            </div>
        </div>
    </div>
  )
}
