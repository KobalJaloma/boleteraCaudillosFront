import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import CaudillosTicket from './CaudillosTicket';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CaudillosTicket />
    </BrowserRouter>
  </React.StrictMode>
)
