import React, { useEffect, useState } from 'react';
import { useForm } from "../../hooks";

const initConfig = {
    size : '30rem', 
    buttonColor : "dark",
    filterBy: 'nombre',
}

//inicializa la funcion que se puede llamar al momento de cliquear el boton del modal
const initToDo = () => {};
const initOnClickRow = (inputValue) => {};
 
export const ModalTableFilter = ({titulo = '', target = '', registros = [], config = initConfig, toDo = initToDo, onClickRow = initOnClickRow, habilitar = true}) => {
    let encabezado = [];
    //ACTUALIZAR LOS VALORES DE CONFIGURACION CON LOS NUEVOS INGRESADOS
    const configProv = config;
    config = {
        ...initConfig,
        ...configProv
    }

    //EVITAR ERRORES DE RENDERIZADO
    if(registros == [] || registros == '' || registros == null ||  registros == undefined) {
        console.log("Modal Vacio");
        return null;
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
    if(encabezado != '') {
        encabezado = Object.keys(registros[0]);
    }

    //FOMRULARIO DEL FILTER
    const {formState, onInputChange, onResetForm, setFormState, filter, informacion, habilitado} = useForm({
        filter: '',
        informacion : registros,
        habilitado: habilitar
    });

    //HACER RENDERIZADO CADA QUE SE ACTUALIZA
    useEffect(() => {
        filtrarResultados();
    }, [filter, registros]);

    useEffect(() => {
        onInputChange({target: {name: 'habilitado', value: habilitar}});
    }, [habilitar]);

    const filtrarResultados = () => {
        if(config.filterBy == "nombre"){
            if(registros == '' || registros == null){
                console.log(registros);
                return;
            }
            const registroFilter = registros.filter( ({nombre}) => nombre.toLowerCase().includes(filter.toLowerCase()));
            
            if(registroFilter == '') {
                return null;
            }

            onInputChange({
                target: {
                    name: "informacion",
                    value: registroFilter
                }
            })
        }
        if(config.filterBy == "id"){
            if(registros == '' || registros == null){
                console.log(registros);
                return;
            }
            const registroFilter = registros.filter( ({id}) => id == filter);
            
            if(registroFilter == '') {
                return null;
            }

            onInputChange({
                target: {
                    name: "informacion",
                    value: registroFilter
                }
            })
        }
    }

    return (
    <>
    <button type="button" 
        className={`btn btn-${config.buttonColor}`} 
        data-bs-toggle="modal" 
        data-bs-target={`#${target}`} 
        aria-disabled="true"
        onClick={toDo}
        disabled={!habilitado}
    >
        <i className={`bi bi-search`}></i>
    </button> 
    <div className="modal fade" id={target} tabIndex="-1" aria-hidden="false">
        <div className='d-flex justify-content-center'>
            <div className="modal-dialog" style={{width: config.size, maxWidth: '100vw', minWidth: '30rem'}}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <input 
                            type={'text'} 
                            placeholder="Filter" 
                            className='form-control mx-5'
                            onChange={onInputChange}
                            value={filter}
                            name={"filter"}
                        />
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setFormState({...formState, filter : ""})}></button>
                    </div>
                    <div className="modal-body">
                        <table className='table'>
                            <thead className='bg-secondary'>
                                <tr className='text-white'>
                                    {
                                    encabezado.map( (titulo) => (
                                        <td key={titulo}>{titulo.toUpperCase()}</td>
                                    ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    informacion.map((registro)=> (
                                        // IDENTIFICADOR UNICO POR CADA FILA                               //RETORNARA EL REGISTRO A UNA FUNCION onClickRow
                                        <tr id={`t_registro_${registro.id}`} key={registro.id} data-bs-dismiss="modal" aria-label="Close" onClick={() => {onClickRow(registro)}}>
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

