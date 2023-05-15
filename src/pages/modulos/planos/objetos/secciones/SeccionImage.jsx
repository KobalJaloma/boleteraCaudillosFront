import React, { useState } from 'react'
import Draggable from 'react-draggable'

export const SeccionImage = () => {

  const [isDraggable, setIsDraggable] = useState(true);

  const toggleDrag = () => {
    setIsDraggable(!isDraggable);
  }

  return (
    
    <Draggable
        defaultPosition={{x: 0, y: 0}}
        grid={[10,10]}
        disabled={!isDraggable}
    >
        <div 
            className={`container bg-primary d-flex justify-content-center align-items-center`} 
            bg-warning style={{width: '600px', height:'600px', position: 'relative', zIndex: 0}}
        >
          <img 
            src='wallpapers/fondo-login.jpg'
            style={{width: '500px', height:'500px'}}
            draggable={false}
          />
          <button 
            onClick={toggleDrag} className='btn btn-dark' 
            style={{position: 'absolute', bottom: 0, right: 0}}
          >
            {
              isDraggable
              ? <i className="bi bi-check"></i>
              : <i class="bi bi-pencil"></i>
            }
            
          </button>
        </div>
    </Draggable>
    
  )
}
