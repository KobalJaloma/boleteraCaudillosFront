import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const initConfig = {
    titulo: 'titulo de la grafica'
}

const initDatos = {
    nombre: 'lol', data: [100]
}

const initColumnas = ['Test Columnas']

export const GraficaLineas = ({ config = initConfig, columnas = initColumnas, datos = [initDatos] }) => {
  
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: config.titulo,
          },
        },
    };
    
    const estadistica = (datos, nombre) => {
        return {
            data: datos,
            label: nombre,
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
        }
    }
    
    const data = {
        labels: columnas,
        datasets: datos.map( ({data, nombre}) => estadistica(data, nombre)) ,
    };

    return (
    <div className='container' style={{width: '50rem'}}>
        <Bar data={ data } options={ options }/>
    </div>
  )
}
