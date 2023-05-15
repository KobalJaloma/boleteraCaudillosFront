import { useEffect, useRef, useState } from "react";
import { SeccionTest, Seccion, SeccionImage} from './secciones';
import { useForm } from "../../../../hooks";
import { asientos } from './asientos'
import { Modal } from "../../../../components";

const initConfig = {
    wPanel: 1500, //Tamano del panel
    yPanel: 800,
    wEspacio: 3000, // tamano del espacio 2d
    yEspacio: 2000,
    wLinel: 1, //tamano de las lineas de la cuadricula en px
    Interlineado: 100 //tamano entre cada linea dibujada de la cuadricula en px
}

export const Panel = ({secciones, setSecciones, config = initConfig }) => {
    
    config = {...initConfig, config};

    const {formState ,handleChangeValueObject, onInputChange, onResetForm, nombre, aforo, id, figura, color } = useForm({
        nombre: '',
        aforo: '',
        id: '',
        figura: '',
        color: '#3B2A94'
    });

    const [zoom, Setzoom] = useState(1);
    const [menu, setMenu] = useState(true);
    const figuras = [
        'cuadrado', 'paralelogramo', 'circulo', 'cuarto-circulo', 'semi-circulo'
    ];
    //'trapecio', 'triangulo', 'triangulo-equilatero','triangulo-isoseles',

    //Funciones para el dibujado de la cuadricula dinamica
    const DrawPanelLines = () => {
        const interlineado = config.Interlineado;
        const xEspacio = config.wEspacio;
        const yEspacio = config.yEspacio;

        var xEspacios = xEspacio/ interlineado;
        var yEspacios = yEspacio/ interlineado;

        const DOMS = [<Cuadriula position={0} lineWeight={3} orientacion={'H'}/>];

        for (let index = 1; index <= yEspacios; index++) {
            if(index%5 == 0) {
                DOMS.push(<Cuadriula position={index*interlineado} lineWeight={3} orientacion={'V'}/>)
            }
            else {
                DOMS.push(<Cuadriula position={index*interlineado} orientacion={'V'}/>)
            }
        }

        for (let index = 1; index <= xEspacios; index++) {
            if(index%5 == 0) {
                DOMS.push(<Cuadriula position={index*interlineado} lineWeight={3} orientacion={'H'}/>)
            }
            else {
                DOMS.push(<Cuadriula position={index*interlineado} orientacion={'H'}/>)
            }
        }

        return DOMS.map(linea => linea);
    }
    const Cuadriula = ({position, lineWeight = 0, orientacion}) => {
        if(orientacion == 'V') {
            return (<div className='bg-secondary p-0 m-0' style={{width: `${config.wEspacio}px`, height: `${config.wLinel + lineWeight}px`, position: 'absolute', top: `${position}px`, left: 0}} />)
        }
        if(orientacion == "H"){
            return ( <div className='bg-secondary' style={{width: `${config.wLinel + lineWeight}px`, height: `${config.yEspacio}px`, position: 'absolute', top: 0, left:  `${position}px`}} />)
        }
    }

    // // SECCIONES
    // const DrawSecciones = () => {
    //     return secciones.map(seccion => seccion);
    // }
    
    const createSeccion = () => {
        setSecciones([...secciones, <Seccion figura={figura} atributos={{capacidad: aforo, nombre: nombre, id: id, color: color, size: {height: 100, width: 100}}}/>]);
        onResetForm();
    }

    const resetPanel = () => {
        setSecciones([]);
    }

    const handleZoom = (tipo) => {
        if(tipo == 1 && zoom < 3) {
            Setzoom(zoom + 0.25);
            return;
        }
        if(tipo == 0 && zoom > 0.5) {
            Setzoom(zoom - 0.25);
            return;
        }
    }

    const handleMenu = () => {
        setMenu(!menu);
        console.log(secciones);
    }
    
    const onSelectMenuRadio = (value) => {
        handleChangeValueObject('figura', value)
    }


    return (
        <div className='container-fluid d-flex overflow-hidden border-3' style={{width: `${config.wPanel}px`, height: `${config.yPanel}px`, position: 'relative'}}>
            {/* CONTROL DEL PANEL */}
            <div className='container d-flex flex-column align-items-end' id='p_zoom' style={{position: 'absolute', bottom: '1rem', right: '3rem', zIndex: '2', width: '10rem', height: '10rem'}}>
                <div className='d-flex justify-content-center align-items-center mb-3'>
                    <button className="btn btn-warning mx-1 rounded-circle align-self-end" onClick={resetPanel}><i className="bi bi-arrow-clockwise"></i></button>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-dark mx-1 rounded-circle' onClick={() => handleZoom(1)}><i className="bi bi-zoom-in"></i></button>
                    <button className='btn btn-dark mx-1 rounded-circle' onClick={() => handleZoom(0)}><i className="bi bi-zoom-out"></i></button>
                </div>
            </div>
            <div className={`container d-flex flex-column overflow-auto gs-panel-menu ${menu ? 'bg-dark': ''}`} style={{width: '30rem', height: `${config.yPanel}px`, position: 'absolute', top: 0, left: `${menu ? '0' : '-25rem'}`, zIndex: 2}}>
                <div className='d-flex justify-content-end my-3' style={{position: 'relative'}}>
                    <button className={`btn ${menu ? 'bg-light': 'btn-dark'}`} onClick={handleMenu} style={{width: '3rem'}}>
                        {
                            menu 
                            ? <i className="bi bi-arrow-bar-left"></i>
                            : <i className="bi bi-arrow-bar-right"></i>
                        }
                    </button>
                </div>
                <div className="container d-flex flex-column" hidden={!menu}>
                    <h1 className="text-light text-center mb-5"></h1>       
                    <div className="container mb-5">
                        <div className="row">
                            <div className="col-md col-md-12 mb-3">
                                <input type="text" 
                                    className="form-control"
                                    placeholder="Nombre De Seccion"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-md col-md-6 mb-3">
                                <input type="number" 
                                    className="form-control"
                                    placeholder="Aforo"
                                    name="aforo"
                                    value={aforo}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-md col-md-6 mb-3">
                                <input type="text" 
                                    className="form-control"
                                    placeholder="Seccion"
                                    maxLength={1}
                                    name="id"
                                    value={id}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-md col-md-12 mb-3">
                                <input 
                                    type="color" 
                                    style={{width: '100%'}} 
                                    className="form-control form-control-color" 
                                    name="color"
                                    value={color}
                                    onChange={onInputChange} 
                                    title="Choose your color"
                                    id="p_color"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container figuritas d-flex flex-column">
                        <div className="row">   
                        {
                            figuras.map(figura => (
                                <div className="col col-md-4 mb-5">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id={`radio_${figura}`} onClick={() =>onSelectMenuRadio(figura)}/>
                                        <div className={`container bg-light ${figura}`} style={{width: '3rem', height:'3rem'}}/>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    <div className="container d-flex flex-column">
                        <div className="row">
                            <div className="col-md col-md-12 d-flex justify-content-center mb-3 ">
                                <button className="btn btn-success" onClick={createSeccion}>Agregar Seccion</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='overflow-auto border p-0 m-0' style={{width: `${config.wPanel}px`, height: `${config.yPanel}px`}}>
                {/* AQUI ES EL ESPACIO EN 2D */}
                
                    <div 
                        className='bg-white overflow-hidden'
                        style={{width: `${config.wEspacio}px`, height: `${config.yEspacio}px`, position: 'relative', zoom: zoom}} 
                        id="panel_main"
                    >
                        <DrawPanelLines/>
                        {/* <SeccionImage/> */}
                        
                        {
                            secciones.map( seccion => seccion)
                        }

                        {/* <DrawSecciones/> */}
                        {/* <Seccion keySec={1} panelPosition={{left: 0, top: 0}} destroy={(res) => destroySecciones(res)}/> */}
                    </div>
            </div>
        </div>
    )
}