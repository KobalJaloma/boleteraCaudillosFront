import React from 'react'
import { NavBar, Cargando, GraficaLineas, GraficaPastel } from "../components";
import { useAxios } from "../hooks";

const env = import.meta.env;

const uri = {
    empresas: `${env.VITE_REACT_API_ROUTE}api/empresas?atributos=id,nombre`,
    eventos: `${env.VITE_REACT_API_ROUTE}api/eventos?atributos=id,nombre`,
    usuarios: `${env.VITE_REACT_API_ROUTE}api/usuarios`,
    
}

export const Estadisticas = () => {

    const empresas = useAxios(uri.empresas, 'get');
    const eventos = useAxios(uri.eventos, 'get');
    const usuarios = useAxios(uri.usuarios, 'get');

  return (
    <div className='container-fluid p-0 m-0'>
        <NavBar/>
        <div className='container-fluid p-0'>
            <div className='container-fluid d-flex justify-content-center row p-1 mt-5 mx-0' >
                {
                    !empresas.isLoading
                    ? <Banners value={empresas.data} objeto={"empresas"} color={"gradient-bg-animation"}/> 
                    : <div className='col col-md-6'><Cargando /></div>
                }
                {
                    !eventos.isLoading
                    ? <Banners value={eventos.data} objeto={"eventos"} color={"gradient-bg-animation-calido"}/> 
                    : <div className='col col-md-6'><Cargando /> </div>
                }
                {
                    !usuarios.isLoading
                    ? <Banners value={usuarios.data} objeto={"usuarios"} color={"gradient-bg-animation"}/> 
                    : <div className='col col-md-6'><Cargando /> </div>
                }
            </div>
            <div className='container-fluid d-flex justify-content-center row p-1 mt-5 mx-0'>
                <div className='col col-md-6 d-flex justify-content-center'>
                    <GraficaPastel 
                        nombres={['Generales', 'Cortesias', 'Plata', 'Oro', 'Vip']}
                        datos={[6000, 1000, 1100, 900, 300]}
                        descripcion={'Vista de partido Dinos VS Caudillos'}
                        colorId= {1}
                        config={{titulo: 'Caudillos', width: '500px'}}
                    />
                </div>
                <div className='col col-md-6 d-flex justify-content-center'>
                    <GraficaLineas 
                        config={{titulo: 'Ingreso'}}
                        datos={[{nombre: 'Caudillos', data: [150000, 160000, 300000, 290000]}, {nombre: 'Eventos Extras', data: [100000, 130000, 250000, 230000]}]}
                        columnas={['Enero', 'Febrero', 'Marzo', 'Abril']}
                    />
                    
                </div>
            </div>
        </div>
    </div>
  )
}

const Banners = ({value, objeto, color}) => {

    if(!value) {
        return;
    }
    return (
        <div className='col col-md-3 mb-4'>
            <div className={`container-md ${color} rounded p-3`} style={{height: '10rem'}}>
                <div className='container'>
                    <h1 className='text-light'>{objeto.toUpperCase()}</h1>
                    <h1 className='text-light'>{value.length}</h1>
                </div>
            </div>
        </div>
    )
}