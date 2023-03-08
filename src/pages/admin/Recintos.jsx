import React, { useState } from 'react';
import { NavBar, ModalTable, ModalTableFilter, ErrorAlert, SuccessAlert } from '../../components';
import { useForm, useAxios } from '../../hooks'
import { newPost } from "../../helpers";


const uri = {
    usuarios: 'http://35.88.32.212:8000/api/usuarios',
    api: 'http://35.88.32.212:8000/api/',
    recintos: 'http://35.88.32.212:8000/api/recintos'
}

export const Recintos = () => {

    //form hook
    const {formState, onInputChange, onResetForm, recinto, calle, numero, colonia, postal, ciudad, estado, pais } = useForm({
        recinto: '',
        calle : '', 
        numero : '',
        colonia : '',
        postal : '',
        ciudad : {},
        estado : {},
        pais : {}
    });

    const [url, setUrl] = useState(uri.usuarios);
    const { data } = useAxios(url);

    //HARA QUE CAMBIE LA PETICION HTTP AL SERVIDOR
    const changeUrl = (url) => {
        const URI = `${uri.api}${url}`;

        if(url == null || url == undefined || url == "") {
            console.log("URL No Valida");
            return null;
        }
        setUrl(URI);
    };


    const saveRecinto = () => {

        //validar informacion completa
        if(recinto == '' || calle == '' || numero == '' || colonia == '' || postal == '' || ciudad.id == '' || estado.id == '' || pais.id == '') {
            ErrorAlert({text: "Debe ingresar todos los datos requeridos"})
            return null;
        }
        
        const payload = {
            nombre : recinto,
            direccion : `${calle} ${numero} ${colonia} ${postal}`,
            estatus : 1,
            cordenadas : '', 
            ciudad : ciudad.id,
            estado : estado.id,
            pais : pais.id,
        }
        
        const data = newPost(uri.recintos, payload);
        if(data.estatus == 'Fail') {
            ErrorAlert({text: data.message});
            return null;
        }

        SuccessAlert({text: data.message});
    }

  return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
        <NavBar />

        <div className='container-fluid d-flex flex-column justify-content-center mt-5'>

            <div className='container-fluid bg-light mb-5 p-5 rounded' style={{maxWidth: '40rem'}}>
            <h1 className='mb-4'> <i className="bi bi-house-add-fill"></i> Generar Recinto</h1>
            <div className='d-flex flex-column justify-content-center'>
                <div className='row g-0 text-center mb-3'>

                <div className='col-sm-6 col-md-12 mb-3'>
                    <div className='container input-group'>
                    <span className='input-group-text'><i className="bi bi-plus-square"></i></span>
                    <input 
                        className='form-control'
                        placeholder='Nombre del Recinto'
                        name='recinto'
                        onChange={onInputChange}
                        value={recinto}
                    />
                    </div>
                    
                </div>

                <div className='col-sm-6 col-md-12 mb-4 '>
                    <div className='container input-group mb-2'>
                        <span className='input-group-text'><i className="bi bi-signpost"></i></span>
                        <input 
                            className='form-control'
                            placeholder='Calle'
                            name='calle'
                            onChange={onInputChange}
                            value={calle}
                            
                        />
                        <span className='input-group-text'><i className="bi bi-hash"></i></span>
                        <input 
                            className='form-control'
                            placeholder='Numero'
                            type={'number'}
                            name='numero'
                            onChange={onInputChange}
                            value={numero}
                            
                        />
                    </div>
                    <div className='container input-group'>
                        <span className='input-group-text'><i className="bi bi-signpost"></i></span>
                        <input 
                            className='form-control'
                            placeholder='Colonia'
                            name='colonia'
                            onChange={onInputChange}
                            value={colonia}
                            
                        />
                        <span className='input-group-text'><i className="bi bi-mailbox"></i></span>
                        <input 
                            className='form-control'
                            placeholder='Codigo Postal'
                            type={'number'}
                            name='postal'
                            onChange={onInputChange}
                            value={postal}
                        />
                    </div>
                </div>
                
                <div className='col-6 col-md-12 mb-3'>
                    <div className='container input-group'>
                    <ModalTableFilter 
                        titulo='Paises'
                        target='paises'
                        registros={data}
                        toDo={()=> {changeUrl('ubicaciones/paises'); console.log(formState)}}
                        // OBTENER EL VALOR SELECCIONADO
                        onClickRow={(registro)=> {onInputChange({
                            target: {
                                name: "pais",
                                value: registro
                            }
                        })}}
                        config={{
                            buttonColor: "primary",
                            size: "40rem"
                        }}
                    />
                    <input 
                        className='form-control'
                        placeholder='Pais'
                        name='pais'
                        onChange={onInputChange}
                        value={pais.nombre}
                        disabled
                    />
                    </div>
                </div>

                <div className='col-6 col-md-6'>
                    <div className='container input-group'>
                    <ModalTableFilter
                        titulo='Estados'
                        target='estados'
                        registros={data}
                        toDo={()=> { changeUrl(`ubicaciones/estados/estadosPais/${pais.id}`)}}
                        onClickRow={(registro)=> {onInputChange({
                            target: {
                                name: "estado",
                                value: registro
                            }
                        })}}
                        config={{
                            buttonColor: "primary",
                            size: "30rem",
                        }}
                    />
                    <input 
                        className='form-control'
                        placeholder='Estado'
                        name='estado'
                        onChange={onInputChange}
                        value={estado.nombre}
                        disabled
                    />
                    </div>
                </div>

                <div className='col-6 col-md-6 '>
                    <div className='container input-group'>
                    <ModalTableFilter
                        titulo='Ciudades'
                        target='ciudades'
                        registros={data}
                        toDo={()=> changeUrl(`ubicaciones/ciudades/ciudadesEstado/${estado.id}`)}
                        onClickRow={(registro)=> {onInputChange({
                            target: {
                                name: "ciudad",
                                value: registro
                            }
                        })}}
                        config={{
                            buttonColor: "primary",
                            size: "80rem",
                            
                        }}
                    />
                    <input 
                        className='form-control'
                        placeholder='Ciudad'
                        name='ciudad'
                        onChange={onInputChange}
                        value={ciudad.nombre}
                        disabled
                    />
                    </div>
                </div>


                </div>
                <button className='btn btn-success' onClick={saveRecinto}>Guardar Recinto</button>  
            </div>
            </div>
        </div>
    </div>
  )
};
