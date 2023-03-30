import React from 'react';
import { NavBar, ModalTableFilter, Excel, ErrorAlert } from "../../components";
import { useForm, useAxios } from '../../hooks';
import { newGet } from "../../helpers";


const env = import.meta.env;

const uri = {
    eventos: `${env.VITE_REACT_API_ROUTE}api/eventos?atributos=nombre,id`,
    usuariosByTickets: `${env.VITE_REACT_API_ROUTE}api/tickets/escaneado?` //params
}

export const ReporteEscaneo = () => {
    
    const {data, isLoading} = useAxios(uri.eventos, 'get');

    const {formState,  onInputChange, onResetForm, handleChangeValueObject ,evento, reportes} = useForm({
        evento: {id: '', nombre: ''},
        reportes: []
    });
    
    const getReporte = async() => {
        const atributos = ['codigo', 'fk_usuarioEscaneado', 'updatedAt'];
        const atributosStr = `${atributos}`;
        const registros = await newGet(`${uri.usuariosByTickets}atributos=${atributos}&evento=${evento.id}`);
        console.log(`${uri.usuariosByTickets}atributos=${atributos}&evento=${evento.id}`);
        if(registros == '') {
            handleChangeValueObject('reportes', [""]);
            ErrorAlert({text: "No Se Encontraron Registros Sobre Este Reporte"})
            return;
        }

        onInputChange({
            target: {
                name: 'reportes',
                value: registros
            }
        });
        console.log(registros);
    }

    return (
    <div className='container-fluid p-0 wallpaper-gradiant-blue' style={{height: '100vh'}}>
        <NavBar/>
        <div className='container-lg d-flex justify-content-center flex-column mt-5'>
            <div className='container-fluid bg-light mb-3    p-5 rounded'>
               <h1 className='mb-3'> <i className="bi bi-calendar-event"/> Reporte De Escaneo Por Evento</h1>
                <div className='d-flex flex-column justify-content-center'>
                    <div className='row g-0 text-center mb-3'>
                        <div className='col-sm-6 col-md-12 mb-3'>
                            <div className='container input-group'>
                            <ModalTableFilter
                                titulo='Eventos'
                                target='m_eventos'
                                registros={data}
                                onClickRow={(registro) => onInputChange({
                                    target: {
                                        name: 'evento',
                                        value: registro
                                    }
                                })}
                            />
                            <input 
                                className='form-control'
                                placeholder='Evento'
                                name='evento'
                                onChange={onInputChange}
                                value={evento.nombre}
                            />
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-12'>
                            <div className="d-flex justify-content-end">
                                <button className='btn btn-dark' onClick={getReporte}>Traer Reporte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-lg d-flex justify-content-center">

            </div>
            <div className={`container-fluid mb-5 p-3 rounded overflow-auto ${reportes != '' ? 'bg-white':''}`}  style={{maxHeight: '30rem'}}>
                {
                    reportes == ''
                    ? <></>
                    : <Excel datos={reportes} config={{btnColor: 'primary'}} encabezados={['llaves', 'papel', 'ayer']}/>
                }
                
            </div>
        </div>      
    </div>
  )
}

const TableHelper = ({reportes}) => {
    
    const columns = Object.keys(reportes[0]);

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
        <div className='container bg-white'>
            <table className='table'>
                <thead>
                    <tr>
                        {
                            columns.map(registros => (
                                <th key={registros}>{registros}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        reportes.map(registro => (
                            <tr id={registro.codigo}>
                                { desestructurar(registro) }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
