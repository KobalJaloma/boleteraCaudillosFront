import React, { useEffect, useState } from 'react';
import { NavBar, ModalTableFilter, SuccessAlert, ErrorAlert } from "../../components";
import { useForm, useAxios } from "../../hooks";
import { newGet, newPost, newPut } from '../../helpers'

const uri = {
    eventos: 'http://localhost:8000/api/eventos',
    ticketsEnvios: 'http://localhost:8000/api/tickets/envios/',
    ticketsEstatus: 'http://localhost:8000/api/tickets/envios/actualizarEstado',
    ticketsEnviosReportes: 'http://localhost:8000/api/ticketsEnvios',
    enviarCorreo: 'http://localhost:8000/api/email',
    qr: 'http://localhost:8000/api/generarQr'
}

export const EnviarTickets = () => {
    const eventos = useAxios(uri.eventos, 'get');
    const [tickets, setTickets] = useState([]);
    const [isUpdateTicket, setIsUpdateTicket] = useState(false);

    const { formState, onInputChange, onResetForm, receptor, correo, telefono,  evento, correoDirec, enviar} = useForm({
        receptor: '',
        correo: '',
        correoDirec: '',
        telefono: '',
        enviar: 0,
        evento: {id: ''}, 
    });

    const getTickets = async() => {
        if(evento.id == '') {
            return;
        }

        const response = await newGet(uri.ticketsEnvios + evento.id);

        if(response == '') {
            ErrorAlert({text: 'No hay Tickets disponibles en este evento'})
            setTickets([]);
            return;
        }

        setTickets(response);
    }

    const enviarTickets = async() => {
        if(receptor == '' || correo == '' || telefono == '' ||  evento == '' || correoDirec == '' || enviar == 0) {
            ErrorAlert({text: 'Debe ingresar todos los campos solicitados'});
            return;
        }   
        
        if(enviar > tickets.length) {
            ErrorAlert({text: `No Hay ${enviar} tickets en existencia` });
            return;
        }


        //GENERAR HTML PARA ENVIAR AL CORREO
        let htmlProv = '<div><h1>CAUDILLOS CHIHUHUA</h1> <p></p></div>';
        const sendTicketsId = [];

        for (let index = 0; index < enviar; index++) {
            sendTicketsId.push(tickets[index].codigo);
            htmlProv += `<div><p>Codigo: <p style="color: blue">${tickets[index].codigo}</p></p></div>`;
        }
        
        //CAMBIAR EL ESTATUS DE TODOS LOS TICKETS ENVIADOS
        setIsUpdateTicket(true);
        sendTicketsId.forEach(async(codigo)=> {
            const updateEstado = await newPut(uri.ticketsEstatus, {codigo: codigo});
            if(updateEstado == '') return;
            if(updateEstado.estatus == 'FAIL'){
                ErrorAlert({text: updateEstado.message})
                return;
            }
        });

        //ENVIAR LOS CORREOS MEDIANTE NUESTRA API
        const payload = {
            receptor : receptor, 
            email : correo + "@" + correoDirec, 
            remitente : 'Sistemas Caudillos',
            informacion: `Envio ${enviar} de el juego ${evento.nombre}, su numero de telefono es ${telefono}`,
            asunto: 'Tickets de Caudillo',
            html: htmlProv
        }
        const response = await newPost(uri.enviarCorreo, payload);

        if(response == '') {
            ErrorAlert({text: "No se pudo finalizar su envio"});
            return;
        }
        if(response.estatus == 'FAIL') {
            ErrorAlert({text: response.message});
            return;
        }

        //ENVIAR EL REPORTE DE USUARIO RECEPTOR DE TICKETS
        const ReportePayload = {
            fk_evento: evento.id,
            nombre: receptor,
            telefono: telefono,
            correo: correo + "@" + correoDirec,
            tickets: `${sendTicketsId}`,
        }
        const reportesPost = await newPost(uri.ticketsEnviosReportes, ReportePayload);

        if(reportesPost == '') {
            ErrorAlert({text: 'ERROR AL SUBIR LOS REPORTES'});
            return;
        }
        if(reportesPost.estatus != 'OK') {
            ErrorAlert({text: reportesPost.message});
            return;
        }

        setIsUpdateTicket(false);
        SuccessAlert({text: response.message});

        // ACTUALIZAR LA LISTA DE TICKETS
        getTickets();
    }

    useEffect(() => {
        getTickets();
    }, [evento]);

    
    
    return (
    <div className='container-fluid bg-dark p-0 pb-5' style={{height: '100vh'}}>
        <NavBar />
        <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-column justify-content-center mt-5 bg-light p-3 rounded' style={{minWidth: "30rem", maxWidth: '80rem'}}>
                <div className='row g-0 text-center mb-4'>
                    <div className='col-6 col-md-6 mb-4'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-person-circle"></i></span>
                            <input
                                className="form-control"
                                name='receptor'
                                placeholder='Nombre'
                                value={receptor}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className='col-6 col-md-6'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-envelope"></i></span>
                            <input
                                className="form-control"
                                name='correo'
                                placeholder='Correo'
                                value={correo}
                                onChange={onInputChange}
                            />
                            <span className='input-group-text'><i className="bi bi-at"></i></span>
                            <input
                                className="form-control"
                                name='correoDirec'
                                placeholder='gmail.com'
                                value={correoDirec}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className='col-6 col-md-3'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i className="bi bi-phone"></i></span>
                            <input
                                className="form-control"
                                name='telefono'
                                placeholder='Telefono'
                                value={telefono}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className='col-6 col-md-3'>
                        <div className='container input-group'>
                            <div className='input-group-text'>Enviar</div>
                            <input
                                type={'number'}
                                className="form-control"
                                name='enviar'
                                placeholder='Tickets a enviar'
                                value={enviar}
                                onChange={onInputChange}
                                disabled={evento.id == '' || tickets.length == 0 ? true : false}
                            />
                        </div>
                    </div>
                    <div className='col-6 col-md-6 mb-4'>
                        <div className='container input-group'>
                            <ModalTableFilter 
                                target='m_eventos'
                                titulo='Eventos'
                                registros={eventos.data} 
                                onClickRow={(registro) => {
                                    onInputChange({
                                        target: {
                                            name: 'evento',
                                            value: registro
                                        }
                                    })
                                }}                              
                            />
                            <input
                                className="form-control"
                                name='evento'
                                placeholder='Eventos'
                                value={evento.nombre}
                                onChange={onInputChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-6 col-md-4'>
                        {/* GENERAR ESPACIADO ENTRE EL BOTON Y EL ELEMENTO ENVIAR*/}
                    </div>
                    <div className='col-6 col-md-12'>
                        <div className='container input-group'>
                            <button className='btn btn-primary' onClick={enviarTickets}><i className="bi bi-envelope" disabled={isUpdateTicket}></i> Enviar correos</button>
                        </div>
                    </div>
                    {
                        isUpdateTicket
                        ? <p>Enviando informacion...</p>
                        : <></>
                    }
                    
                </div>
                <div className='container-fluid'> 
                    {
                        tickets == '' 
                        ? <p className='bg-dark p-3 rounded text-light'>No hay informacion disponible</p>
                        : <h5 className='bg-dark p-3 rounded text-light'>Tickets Disponibles: <b className='text-warning'>{tickets.length} unidades</b></h5>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}


//TABLA PARA REDUCIR EL ESPACIO EN EL COMPONENTE PRINCIPAL
const TableHelper = ({tickets = []}) => {
    const columns = Object.keys(tickets[0]);
    console.log(columns);
    const desestructurar = (registro = {}) => {
        let count = 0;
        if(registro == '') {
            return;
        }
        // EXTRAER LOS VALUES DEL REGISTRO EN UN ARRAY
        const values = Object.values(registro);

        return values.map((values) => (
            <td id={count++}>{values}</td>
        ));
    }

    return(
        <div>
            <h3 className='text-dark'>Tickets Disponibles: <b className='text-warning'>{tickets.length}</b></h3>
            <table class="table">
                <thead>
                    <tr>
                    {
                        columns.map((registro) => (
                            <th scope="col">{registro.toUpperCase()}</th>
                        ))
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.map((row) => (
                            <tr id={`t_registro_${row.id}`}>
                                { desestructurar(row) }
                            </tr>
                        ))
                    }  
                </tbody>
            </table>
        </div>
    )
}
