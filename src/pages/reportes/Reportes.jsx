import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAxios } from '../../hooks';
import { TicketsPdf } from "../../pdf";
import { PDFViewer } from "@react-pdf/renderer";

const usuariosUri = 'http://localhost:8000/api/usuarios';

export const Reportes = () => {


  return (
    <div>
      <PDFViewer style={{width: "100vw", height: '100vh'}}>
        <TicketsPdf 
          informacion={'hola mamones'}
          ticket={'caudillosVsGalgos'}
        />
      </PDFViewer>
    </div>
  )
}
