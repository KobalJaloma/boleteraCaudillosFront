import React from 'react'
import { useForm } from "../../hooks";
import { newPost } from '../../helpers'
import { ErrorAlert } from '../../components'


const uri = {
    qr: 'http://localhost:8000/api/generarQr',
    ticket: 'http://localhost:8000/api/tickets/ticket'
}
//ESTE MODAL ES ESPECIFICAMENTE CREADO PARA CREAR QR CON LOS CODIGOS PROVISIONALES
export const ModalTicket = () => {
    
    const { formState, onInputChange, onResetForm, ticket } = useForm({
        ticket: ''
    });

    const getQRCode = async() => {
        if(ticket == '') {
            ErrorAlert({text: 'Seleccione todos los datos'});
            return;
        }
        const payloadTicket = {
            codigo: ticket
        }

        const ticketInfo = await newPost(uri.ticket, payloadTicket);
        
        if(ticketInfo == '') {
            ErrorAlert({text: 'El codigo es inexistente'});
            return;
        }

        //GENERAR EL QR DEL CODIGO
        const payload = {
            qr: ticket
        }

        const response = await newPost(uri.qr, payload);

        if(response == '') {
            ErrorAlert({text: 'No se extrajo data'});
            return;
        }
        if(response.estatus != 'OK') {
            ErrorAlert({text: 'Hubo un error al generar'});
            return;
        }
        const contenedor = document.getElementById('QR-container');

        //CREAR LISTAS DE QR
        const htmlObject = document.createElement('div');
        htmlObject.innerHTML = response.qr;

        contenedor.append(htmlObject);
    }

    const reseteQRs = () => {
      const elementos = document.getElementById('QR-container');
      elementos.innerHTML = ' ';
    }
    
    return (
    <>
    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#m_tickets">
        <i className="bi bi-qr-code"></i>
    </button>

    <div className="modal fade" id="m_tickets" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Obtener QR De Entrada</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reseteQRs}></button>
            </div>
            <div className="modal-body">
                <div className='container-fluid'>
                    <div className='d-flex flex-direction-column '>
                        <div className='container-fluid row g-0 text-center'>
                            <div className='col-6 col-md-12 '>
                                <div className='input-group'>
                                    <button 
                                        className='btn btn-outline-dark'
                                        type='button'
                                        onClick={getQRCode}
                                    ><i className="bi bi-qr-code"></i></button>
                                    <input
                                        className='form-control'
                                        placeholder='Codigo De Entrada'
                                        value={ticket}
                                        onChange={onInputChange}
                                        name='ticket'
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='container-fluid' id="QR-container">
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
