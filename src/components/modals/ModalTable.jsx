import React from 'react';

const initConfig = {
    size : '30rem', 
    buttonColor : "dark",
    buttonState: 'active'
}

//inicializa la funcion que se puede llamar al momento de cliquear el boton del modal
const initToDo = () => {};
 
export const ModalTable = ({titulo = '', target = '', registros = [], config = initConfig, toDo = initToDo}) => {
    let encabezado = [];

    //ACTUALIZAR LOS VALORES DE CONFIGURACION CON LOS NUEVOS INGRESADOS
    const configProv = config;
    config = {
        ...initConfig,
        ...configProv
    }

    //EVITAR ERRORES DE RENDERIZADO
    if(encabezado == [] || registros == [] || encabezado == null || registros == null || encabezado == undefined || registros == undefined) {
        console.log("Modal Vacio");
        return (<button type="button" 
                    className={`btn btn-${config.buttonColor}`} 
                    data-bs-toggle="modal" 
                    data-bs-target={`#${target}`} 
                    aria-disabled="true"
                    onClick={toDo}
                >
                    <i className={`bi bi-search`}></i>
                </button> );
    }

    //HELPER DE LA CREACION DE TABLAS
    const desestructurar = (registro) => {
        const values = Object.values(registro);
        let counter = 0;

        return values.map( value => 
             (<td key={counter++}> {value}</td>)
        )
    }
  
    //EXTRAER LAS KEYS DE LOS REGISTROS PARA ENCABEZADOS
    if(encabezado != []) {
        encabezado = Object.keys(registros[0]);
    }
    
    return (
    <>
    <button type="button" 
        className={`btn btn-${config.buttonColor}`} 
        data-bs-toggle="modal" 
        data-bs-target={`#${target}`} 
        aria-disabled="true"
        onClick={toDo}
    >
        <i className={`bi bi-search`}></i>
    </button> 
    <div className="modal fade" id={target} tabIndex="-1" aria-hidden="false">
        <div className='d-flex justify-content-center'>
            <div className="modal-dialog" style={{width: config.size, maxWidth: '100vw', minWidth: '30rem'}}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    {
                                    encabezado.map( (titulo) => (
                                        <td key={titulo}>{titulo.toUpperCase()}</td>
                                    ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registros.map((registro)=> (
                                        // IDENTIFICADOR UNICO POR CADA FILA
                                        <tr id={`t_registro_${registro.id}`} key={registro.id}>
                                            {desestructurar(registro)}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

