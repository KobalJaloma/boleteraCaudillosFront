import React, { useEffect, useRef, useState } from 'react';
import { NavBar } from "../../../components";
import Draggable from "react-draggable";
import { Panel } from "./objetos";


export const Planos = () => {

    const [secciones, setSecciones] = useState([
        // <Seccion keySec={0} panelPosition={{left: 0, top: 0}} destroy={(res) => destroySecciones(res)}/>, 

    ]);

    const resetPanel = () => {
        setSecciones([]);
    }

  return (
    <div className='p-0 container-fluid wallpaper-gradiant-blue'>
        <NavBar />
        <div className='container-fluid d-flex justify-content-center mt-5'>
            {/* <div className="container bg-white rounded p-4">
                <div className='row'>
                    <div><h1>Seleccionar Recinto</h1></div>
                    <div className='col-6 col-small-12'>
                        <input placeholder='Algo'/>
                    </div>
                </div>
            </div> */}
        </div>

        {/* INICIO DEL PANEL PARA LA CREACION DE PLANOS */}
        <div className="container-fluid mt-5" style={{position: 'relative'}}>
            <Panel secciones={secciones} setSecciones={setSecciones} config={{wEspacio: '100', yEspacio: '100'}}/>
        </div>
    </div>
  )
}

