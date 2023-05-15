import React, { useEffect, useState } from 'react';
import { newPost, newGet } from "../../helpers";
import { TicketsPdf } from "../../pdf";
import { useForm } from "../../hooks";
import ReactPDF, { PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";

const env = import.meta.env;

const uri = {
  crearqr: `${env.VITE_REACT_API_ROUTE}api/generarQr/png`,
  ticketsbyEvento: `${env.VITE_REACT_API_ROUTE}api/tickets/evento/` //se agrega el id del evento como param
}

const traerqr = async(tickets) => {
  var tick = await eval(tickets); // convierte un string como si fuera codigo
  console.log(tick);
  let arr = [];
  let i = 1;
  for(let {codigo} of tick ) {
     const res = await newPost(uri.crearqr, {qr: codigo});
     arr.push(res.qr);
     console.log(i);
     i++;
  }
  console.log(arr);
} 

const setTickets = async(qrcode) => {
  var pdfTicket = await eval(qrcode);
  return pdfTicket;
}


export const Reportes = () => {
  
  const { formState, onInputChange, tickets, qrCode, inicial } = useForm({
    tickets: '',
    qrCode: '',
    inicial: 0
  });
  var qr = [];
  const [pdfticket, setPdfticket] = useState([]);

  const setQr = async() => {
    const qr = await setTickets(qrCode);
    setPdfticket(qr)
    console.log(pdfticket);
  }

  return (
    <div>
      <div class="form-floating">
        <textarea 
          class="form-control" 
          placeholder="Insertar los objetos de tickets aqui"
          value={tickets}
          onChange={onInputChange}
          name='tickets'
        ></textarea>
      </div>
      <button onClick={() => traerqr(tickets)}>Hacer qr</button>
      {
       <PDFViewer style={{width: '30rem', height: '30rem'}}>
            
          <TicketsPdf ticket={'CAUDILLOS13052023.png'} qr={pdfticket} inicioIndex={inicial}/>
            
        </PDFViewer>
      }
      
      <div class="form-floating">
        <textarea 
          class="form-control" 
          placeholder="Insertar el encoding de los qr"
          value={qrCode}
          onChange={onInputChange}
          name='qrCode'
        ></textarea>
      </div>
      <button onClick={setQr} className='my-4'>Traer el PDF</button>

      <input 
          name='inicial'
          value={inicial}
          onChange={onInputChange}
          placeholder='Insertar el valor inicial del numero de boleto'
          className='form-control'
          type='number'
      />
    </div>
  )
}


