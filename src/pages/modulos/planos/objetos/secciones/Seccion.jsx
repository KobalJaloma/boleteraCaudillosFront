import React, { useState } from 'react';
import Draggable from "react-draggable";
import { Modal } from "../../../../../components";

const initAtributos = {
    nombre: '',
    capacidad: '',
    id: '',
    color: '#3B2A94',
    posicion: {x: 0, y: 0},
    size: {width: 100, height: 100}
}

export const Seccion = ({atributos = initAtributos, figura}) => {

    const [atrr, setAtrr] = useState({...initAtributos, ...atributos});
    const [rotacion, setRotacion] = useState('0deg');
    const [isDraggable, setIsDraggable] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [visibilidad, setVisibilidad] = useState({
        menuEdit: false,
        edit: false
    });


    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const getData = (e) => {
        const data = {...atrr, event: e, figura: figura}
        
        return data;
    }

    const handleRotacion = (angulo) => {
        console.log(angulo);
        var onlyNumbers = rotacion.replace(/[^0-9]+/g, "")
        onlyNumbers = parseInt(onlyNumbers); 
        if(onlyNumbers >= (360-angulo)) {
            setRotacion('0deg')
            console.log(onlyNumbers);
            return;
        }
        onlyNumbers += angulo;
        console.log(onlyNumbers);
        setRotacion(`${onlyNumbers}deg`)
    }

    const toggleDragable = () => {
        setIsDraggable(!isDraggable);
    }
    
    const toggleEditable = () => {
        setIsEditable(!isEditable);
        if(isEditable) {
            setIsDraggable(false);
            return;
        }else {
            setIsDraggable(true)
        }
    }

    const handleEscala = (x = 1, y = 1) => {
        var modifiX = 1;
        var modifiY = 1;

        //EVALUAR SI SON DESCREMENTOS O INCREMENTOS
        if(Math.sign(y) == 1) {
            modifiX = atrr.size.width * x; 
        }
        if(Math.sign(x) == 1) {
            modifiY = atrr.size.height * y; 
        }
        if(Math.sign(x) == -1) {
            modifiX = atrr.size.width / (-x); 
        }
        if(Math.sign(y) == -1) {
            modifiY = atrr.size.height / (-y); 
        }

        setAtrr({...atrr, size: {height: modifiY, width: modifiX}});
    }

    const handleVisibilidad = () => {
        setVisibilidad({...visibilidad, menuEdit: !visibilidad.menuEdit});
    }

    const clickSeccion = () => {
        console.log("clikeaste la seccion " + atrr.nombre);
    }

  return (
    <>
    <Draggable
        defaultPosition={{x: 100, y: 100}}
        grid={[10,10]}
        disabled={!isDraggable}
    >
        <div className='container p-0' style={{position: 'absolute', width: `${atrr.size.width}px`, height:`${atrr.size.height}px`}}
            onMouseEnter={handleVisibilidad}
            onMouseLeave={handleVisibilidad}
        >   
            {/* MENU DE EDICION */}
            <div className='container d-flex justify-content-center p-0' style={{position: 'absolute', top: '-5rem', left: `0px`, zIndex: 10, minWidth: '20rem', minHeight: '5rem', width: `${atrr.size.width}`, visibility: `${visibilidad.menuEdit ? 'visible' : 'hidden'}`}}>
                <div className='container-fluid d-flex justify-content-around bg-dark p-3' style={{zIndex: 10, maxWidth: '30rem', minWidth: '20rem'}}>
                    {/* <button className={`btn btn-${isDraggable ? 'primary' : 'danger'}`} onClick={() => toggleDragable()}><i className="bi bi-arrows-move"/></button> */}
                    <button className={`btn btn-${isEditable ? 'warning' : 'primary'}`} onClick={() => toggleEditable()}><i class="bi bi-pen"/></button>
                    <button className='btn btn-primary' onClick={() => handleRotacion(45)}>{ rotacion.replace(/[^0-9]+/g, "") + '°' }</button>
                    <button className='btn btn-primary' onClick={() => handleEscala(2,2)}><i className="bi bi-arrows-angle-expand"></i></button>
                    <button className='btn btn-primary' onClick={() => handleEscala(-2,-2)}><i className="bi bi-arrows-angle-contract"></i></button>
                    {/* <button className='btn btn-primary' onClick={() => handleEscala(2)}>escalar x</button> */}
                    {/* <button className='btn btn-primary' onClick={() => handleEscala(1,2)}>escalar y</button> */}
                    <button className='btn btn-primary' onClick={() => onDelete()}><i className="bi bi-trash3-fill"></i></button>
                </div>
            </div>
            
            {
                isDraggable
                ?   <></>
                :   <div className='container d-flex justify-content-center align-items-center p-0' style={{position: 'absolute', width: `${atrr.size.width}px`, height:`${atrr.size.height}px`, top: 0, zIndex: 3}}>
                        <h1><i className="bi bi-lock-fill"/></h1>
                    </div>
            }

            {/* INICIA LA FIGURA */}
            <div 
                className={`container ${figura}`} bg-warning style={{width: `${atrr.size.width}px`, height:`${atrr.size.height}px`, position: 'relative', background: `${atrr.color}`, rotate: `${rotacion}`}}
                onDoubleClick={()=> console.log('se dio el doble click')}
                draggable={false}
            >
                
                {/* CONTROLADORES DE TAMANO */}
                <div 
                    className='d-flex flex-column' 
                    style={{width: `${atrr.size.width}px`,  height:`${atrr.size.height}px`, position: 'absolute', top: 0, left: 0, borderStyle: 'dashed', visibility: `${isEditable ? 'visible' : 'hidden'}`}}
                >
                    <div className='container align-self-start d-flex justify-content-center' style={{flex: 1}}>
                        {/* ARRIBA */}
                        <div className='bg-dark rounded' style={{width: '1rem', height: '1rem'}}
                            onClick={() => handleEscala(1,2)}
                        ></div>
                    </div>
                    <div className='container align-self-center d-flex justify-content-between p-0' style={{flex: 1}}>
                        {/* IZQUIERDA */}
                        <div className='bg-dark rounded align-self-center' style={{width: '1rem', height: '1rem'}}
                            onClick={() => handleEscala(2)}
                        />
                        {/* DERECHA */}
                        <div className='bg-dark rounded align-self-center' style={{width: '1rem', height: '1rem'}}
                            onClick={() => handleEscala(2)}
                            onDragEnter={(e) => console.log(e)}
                            onDragEnd={(e) => console.log(e)}
                        />
                    </div>
                    <div className='container align-self-end d-flex justify-content-center' style={{flex: 1}}>
                        {/* ABAJO */}
                        <div className='bg-dark rounded align-self-end' style={{width: '1rem', height: '1rem'}}
                            onClick={() => handleEscala(1,2)}
                        />
                    </div>
                </div>
                
            </div>
           
        </div>
    </Draggable>
    </>
  )
}
