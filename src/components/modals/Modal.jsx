import React from 'react'

const initConfig = {
    id: 'm_main'
}

export const Modal = ({config = initConfig, nombre}) => {
    console.log('log');

  return (
    <div>
       
       {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${config.id}`}>
        Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id={config.id} tabIndex="-1" aria-labelledby="modeloLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content" >
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modeloLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
