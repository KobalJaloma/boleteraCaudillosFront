import React, { useState } from 'react';
import { NavBar, ModalTableFilter } from "../../components";
import { useForm, useAxios } from "../../hooks";
import { newPost } from "../../helpers";

const env = import.meta.env;

const uri = {
    paises: `${env.VITE_REACT_API_ROUTE}`,
    estados: `${env.VITE_REACT_API_ROUTE}`,
    ciudades: `${env.VITE_REACT_API_ROUTE}`,
    empresas: `${env.VITE_REACT_API_ROUTE}api/empresas`,
    api: `${env.VITE_REACT_API_ROUTE}api/`
}


export const Empresas = () => {
    
    const { formState, onInputChange, onResetForm, empresa, calle, numero, colonia, rfc, pais, estado, ciudad } = useForm({
        empresa: '',
        calle: '',
        numero: 0,
        colonia: '',
        rfc: '',
        pais: {id: 0, nombre: ''},
        estado: {id: 0, nombre: ''},
        ciudad: {id: 0, nombre: ''},
    });

    const [url, setUrl] = useState(`${uri.api}ubicaciones/paises`);
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
     
    const onResetUbicacion = () => {
        const ubicaciones = ['ciudad', 'estado'];
        ubicaciones.forEach(ubicacion => onInputChange({
            target: {
                name: ubicacion,
                value: {id: 0, nombre: ''}
            }
        }));
    }

    const guardarEmpresa = async() => {
        const payload = {
            nombre: empresa,
            direccion: `C. ${calle} #${numero} col. ${colonia} `,
            rfc: rfc,
            ciudad: ciudad.id
        }
        const empresaRes = await newPost(uri.empresas, payload);

        console.log(empresaRes);
    }

  return (
    <div className='container-fluid p-0 wallpaper-gradiant-blue' style={{height: '100vh'}}>
        <NavBar/>
        <div className='container bg-white d-flex flex-column rounded mt-5 p-5'  style={{maxWidth: '40rem'}}>
            <h1 className='mb-4'><i class="bi bi-building"></i> Empresas</h1>
            <div className='d-flex flex-column flex-direction-center'>
                <div className='container-fluid row'>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i class="bi bi-person-circle"></i></span>
                            <input 
                                className='form-control'
                                placeholder='Nombre'
                                name='empresa'
                                onChange={onInputChange}
                                value={empresa}
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i class="bi bi-geo-alt-fill"></i></span>
                            <input 
                                className='form-control'
                                placeholder='Calle'
                                name='calle'
                                onChange={onInputChange}
                                value={calle}
                            />
                            <span className='input-group-text'><i class="bi bi-hash"></i></span>
                            <input 
                                className='form-control'
                                placeholder='Numero'
                                type={'number'}
                                name='numero'
                                onChange={onInputChange}
                                value={numero}
                            />
                            <span className='input-group-text'><i class="bi bi-map"></i></span>
                            <input 
                                className='form-control'
                                placeholder='Colonia'
                                name='colonia'
                                onChange={onInputChange}
                                value={colonia}
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <span className='input-group-text'><i class="bi bi-person-bounding-box"></i></span>
                            <input 
                                className='form-control'
                                placeholder='RFC'
                                name='rfc'
                                onChange={onInputChange}
                                value={rfc}
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <ModalTableFilter 
                                target='m_paises'
                                titulo={'Paises'}
                                registros={data}
                                toDo={()=> { changeUrl(`ubicaciones/paises`); onResetUbicacion();}}
                                onClickRow={(registro) => onInputChange({
                                    target: {
                                        name: 'pais',
                                        value: registro
                                    }
                                })}
                                config={{
                                    buttonColor: 'primary'
                                }}
                            />
                            <input 
                                className='form-control'
                                placeholder='Pais'
                                name='pais'
                                value={pais.nombre}
                                onChange={onInputChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <ModalTableFilter 
                                target='m_estados'
                                titulo={'Estados'}
                                registros={data}
                                habilitar={pais.id != ''}
                                toDo={()=> { changeUrl(`ubicaciones/estados/estadosPais/${pais.id}`); console.log(pais.id);}}
                                onClickRow={(registro) => onInputChange({
                                    target: {
                                        name: 'estado',
                                        value: registro
                                    }
                                })}
                                config={{
                                    buttonColor: 'primary'
                                }}
                            />
                            <input 
                                className='form-control'
                                placeholder='Estados'
                                name='estados'
                                value={estado.nombre}
                                onChange={onInputChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-12 mb-3'>
                        <div className='container input-group'>
                            <ModalTableFilter 
                                target='m_ciuades'
                                titulo={'Ciudades'}
                                registros={data}
                                habilitar={estado.id != ''}
                                toDo={()=> { changeUrl(`ubicaciones/ciudades/ciudadesEstado/${estado.id}`);}}
                                onClickRow={(registro) => onInputChange({
                                    target: {
                                        name: 'ciudad',
                                        value: registro
                                    }
                                })}
                                config={{
                                    buttonColor: 'primary'
                                }}
                            />
                            <input 
                                className='form-control'
                                placeholder='Ciudades'
                                name='ciudad'
                                value={ciudad.nombre}
                                onChange={onInputChange}
                                disabled
                            />
                        </div>
                    </div>
                    <button className='btn btn-primary gradient-button' onClick={guardarEmpresa}>Guardar Empresa</button>
                </div>
            </div>
        </div>
    </div>
  )
}
