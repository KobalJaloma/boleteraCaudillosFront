import React, { useEffect, useState } from 'react';
import { newPost, newGet } from "../../helpers";
import { TicketsPdf } from "../../pdf";
import ReactPDF, { PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";


const usuariosUri = 'http://localhost:8000/api/usuarios';

const uri = {
  crearqr: 'http://localhost:8000/api/generarQr/png',
  ticketsbyEvento: 'http://localhost:8000/api/tickets/evento/' //se agrega el id del evento como param
}


export const Reportes = () => {
  
  return (
    <div>
      <img id='test' src=""></img>
      {
       <PDFViewer style={{width: '30rem', height: '30rem'}}>
            
          <TicketsPdf ticket={'caudillosVsGalgos'} qr={qr}/>
            
        </PDFViewer>
      }
      <button className='btn btn-secondary' onClick={() => downloadCanvas('test', 'test.png')}>Descargar</button>
    </div>
  )
}


