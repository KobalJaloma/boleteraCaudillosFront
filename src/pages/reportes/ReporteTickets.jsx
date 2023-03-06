import React, { useEffect, useState } from 'react';
import { NavBar, ModalTableFilter, ErrorAlert, SuccessAlert } from '../../components';
import { useForm, useAxios } from "../../hooks";
import { newGet } from '../../helpers'

const uri = {
    eventos : 'http://localhost:8000/api/eventos',
    envios : 'http://localhost:8000/api/reportes/ticketEnvios/'
}

export const ReporteTickets = () => {
    const columns = [];

    const eventos = useAxios(uri.eventos, "get");
    const {formState, onInputChange, evento} = useForm({
        evento: {id: ''},
    });  

    const [envios, setEnvios] = useState([]);

    const getEnvios = async() => {
        if(evento.id == ''){
            console.log("evento no seleccionado");
            return;
        }

        const data  = await newGet(`${uri.envios + evento.id}`);
        // EXTRAER LAS KEYS DEL REGISTRO

        if(data == '') {
            ErrorAlert({text: "No Se Encontro Informacion"});
            return;
        }

        setEnvios(data);
    }



    useEffect(() => {
        getEnvios();
    }, [formState]);

    return (
    <div>
        <NavBar />
        <div className='d-flex flex-column justify-content-center mt-5'>
            <div className='container d-flex flex-column '>
                <div className='container-fluid d-flex flex-column justify-content-center mb-5'>
                    <div clasname="row g-0 text-center ">
                        <div className='col-6 col-md-6'>
                            <div className='input-group'>  
                                <ModalTableFilter
                                    titulo={'Eventos'}
                                    target={'eventos'}
                                    registros={eventos.data}
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
                </div>
                <div className='container-fluid d-flex flex-column'>
                {
                    envios == ''
                    ? <></>
                    : <TableHelper tickets={envios}/>
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
            <table class="table table-primary">
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