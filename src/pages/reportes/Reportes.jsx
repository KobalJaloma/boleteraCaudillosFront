import React, { useEffect, useState } from 'react';
import { newPost, newGet } from "../../helpers";
import { TicketsPdf } from "../../pdf";
import ReactPDF, { PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";

const env = import.meta.env;

const uri = {
  crearqr: `${env.VITE_REACT_API_ROUTE}api/generarQr/png`,
  ticketsbyEvento: `${env.VITE_REACT_API_ROUTE}api/tickets/evento/` //se agrega el id del evento como param
}

const traerqr = async() => {
  let arr = [];
  let i = 1;
  for(let {codigo} of tickets ) {
     const res = await newPost(uri.crearqr, {qr: codigo});
     arr.push(res.qr);
     console.log(i);
     i++;
  }
  console.log(arr);
} 

const tickets = [
  
]



const qr =  [   ]


export const Reportes = () => {
  
  return (
    <div>
      <button onClick={traerqr}>Hacer qr</button>
      <img id='test' src=""></img>
      {
       <PDFViewer style={{width: '30rem', height: '30rem'}}>
            
          <TicketsPdf ticket={'CaudillosVSReds.jpeg'} qr={qr}/>
            
        </PDFViewer>
      }
    </div>
  )
}


