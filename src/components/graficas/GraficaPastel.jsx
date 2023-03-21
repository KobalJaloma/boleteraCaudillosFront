import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { colorsBlue, colorsBlueRed, colorsMix } from './paletasColores'

ChartJS.register(ArcElement, Tooltip, Legend);

const init = {
  nombres: ['prueba 1','prueba 2'],
  datos: [13, 43],
  descripcion: 'Esta es la descripcion',
}

const initConfig = {
  width: '50rem', 
  titulo: 'titulo de prueba'
}

const colores = [
  colorsBlue,
  colorsBlueRed,
  colorsMix,
]


export const GraficaPastel = ({nombres = init.nombres, datos = init.datos, descripcion = init.descripcion, config = initConfig, colorId = 1}) => {
  
  if(colorId > colores.length) {
    colorId = 0;
    console.log('EL COLOR ES INEXISTENTE');
  }

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

  const data = {
      labels: nombres,
      datasets: [
        {
          label: descripcion,
          data: datos,
          backgroundColor: (colores[colorId]).colores,
          borderColor: (colores[colorId]).bordes,
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className='grafica' style={{width: config.width}}>
        {
          nombres != '' || datos != '' 
          ? <Pie data={ data } options={options}/> 
          : <p>NO hay datos</p>
        }
      </div>
    )
}
