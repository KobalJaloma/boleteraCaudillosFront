import React, { useState, useEffect } from 'react'

export const ModalMensaje = ({titulo, informacion, mostrar = false}) => {

  return (
    <>
        <div className="modal fade" id={`m_mensaje`} tabIndex="-1" aria-labelledby={'m_mensaje'} aria-hidden={`${mostrar}`}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={mostrar = false}></button>
            </div>
            <div className="modal-body">
                {informacion}
            </div>
            </div>
        </div>
        </div>
    </>
  )
}


{/* 
Event button
    

*/}