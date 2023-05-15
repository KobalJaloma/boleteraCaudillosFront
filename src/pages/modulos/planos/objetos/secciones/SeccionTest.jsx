import React, { useEffect, useState } from 'react'
import Draggable, { DraggableCore } from "react-draggable"; 

export const SeccionTest = ({scale}) => {
    
    const config = {}; 
    const [escala, setEscala] = useState(1);
    
    useEffect(() => {
        setEscala(scale);
        console.log("escala en Item " + escala);
    }, [scale]);

  return (
    <Draggable 
        defaultPosition={{x: 0, y: 0}}
        grid={[10,10]}
        scale={escala}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
    >
        <div className='bg-primary' style={{width: '300px', height: '300px'}}>SeccionTest</div>
        
    </Draggable>
  )
}
