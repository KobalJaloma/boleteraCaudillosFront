import { useContext, useEffect, useRef, useState } from 'react';
import { NavBar, ErrorAlert, SuccessAlert, ErrorAlertShortTime, SuccessAlertShortTime} from '../../components';
import { useForm } from '../../hooks';
import { newGet, newPut, newPost } from "../../helpers";
import { AuthContext } from '../../auth/context/AuthContext';

const env = import.meta.env;

const uri = {
    ticket: `${env.VITE_REACT_API_ROUTE}api/tickets/ticket`, //debe llevar un codigo
    quemarTicket: `${env.VITE_REACT_API_ROUTE}api/tickets/quemarTicket`//es un update
}
export const Escanear = () => {
  const { user } = useContext(AuthContext);

  //disparador para que el input se haga focus
  const [scanTrigger, setscanTrigger] = useState(true);
  const switchTrigger = () => {setscanTrigger(!scanTrigger); console.log("me clikeo");};
  
  const areaEscaneo = useRef(null);

  const { formState, onInputChange, onResetForm, idTicket } = useForm({
    idTicket: ''
  });
  
  useEffect(() => {
    areaEscaneo.current.focus();
  }, [scanTrigger]);

  const evaluarCodigo = async() => {
    if(idTicket == '') {
      ErrorAlertShortTime({text: 'Favor De Escanear Un Codigo'});
      switchTrigger();
      return;
    }

    const payloadTicket = {
      codigo: idTicket
    }
    const ticket = await newPost(uri.ticket, payloadTicket);

    //evaluar estados del ticket y de la peticion
    if(ticket == '') {
      ErrorAlertShortTime({text: 'No se pudo obtener la informacion del ticket, puede ser debido a la inexistencia del mismo, o un error de sistema, intente de nuevo'});      
      onResetForm();
      switchTrigger();
      return;
    }
    
    if(ticket[0].estatus != 1) {
      ErrorAlertShortTime({text: 'El Ticket Ya Se Utilizo'});
      onResetForm();
      switchTrigger();
      return;
    }
  
    //procedimiento par dar de baja el ticket
    const payloadQuemar = {
      codigo: `${idTicket}`,
      usuario: user.id
    }

    const quemarTicket = await newPut(uri.quemarTicket, payloadQuemar);

    //condicionales diferente para que no haga crash si el OBJECT esta vacio
    if(quemarTicket == '') {
      ErrorAlertShortTime({text: 'Hubo un error al obtener su boleto del sistema, intentelo de nuevo'});
      onResetForm();
      switchTrigger();
      return;
    }
    if(quemarTicket.estatus != 'OK') {
      ErrorAlertShortTime({text: 'Hubo un error al verificar su boleto, esto puede ser por un boleto invalido o un error de sistema, intentelo de nuevo'});
      onResetForm();
      switchTrigger();
      return;  
    }

    SuccessAlertShortTime({text: 'El Boleto Se Utilizo De Forma Correcta', time: '3000'});

    //REDIRECCIONAR EL INPUT HACIA LA CAJA DE ESCANEO
    onResetForm();
    switchTrigger();
  }
  
  return (
    <div className='container-fluid p-0 bg-dark' style={{width: '100vw', height: '100vh'}}>
      <NavBar />
      <div className='container-lg d-flex justify-content-center align-items-center flex-column' style={{height: '80vh'}}>
        <div className='container-sm p-5 bg-dark' style={{maxWidth: '30rem'}}>
          <div className='container d-flex justify-content-center my-4'>
            <img 
              src='logos/Caudillo.png'
              style={{maxWidth: '20rem'}}
            />
          </div>
          <div className='container input-group mb-4'>
            <span className='input-group-text'><i className="bi bi-ticket-fill"></i></span>
            <input 
              className='form-control'
              ref={areaEscaneo}
              placeholder='Id Ticket'
              name='idTicket'
              value={idTicket}
              onChange={onInputChange}
              autoFocus
            />
          </div>
          <div className='container-fluid d-flex justify-content-center'>
          {
            idTicket == ''
            ? <></>
            :(<button type="button" className="btn btn-light" style={{padding: '2rem'}} onClick={evaluarCodigo}>
                <i className="bi bi-qr-code"></i>
            </button>)
          }
          </div>
        </div>
      </div>
    </div>

  )
}


//cambio para acceso directo
// const HelperModal = ({trigger = false, accessF, deniedF, codigo}) => {

//   const verificarCodigo = () => {
//     if(codigo == '') {
//       ErrorAlert({text: 'Favor De Escanear Un Codigo'});      
//       return;
//     }
//   }
  
//   return(
//     <>  
//     {
//       codigo == ''
//       ? <></>
//       :(<button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#m_tickets" style={{padding: '2rem'}} onClick={verificarCodigo}>
//           <i className="bi bi-qr-code"></i>
//       </button>)
      
//     }
//     <div className="modal fade" id="m_tickets" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div className="modal-dialog">
//         <div className="modal-content">
//             <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">Obtener QR De Entrada</h1>
          
//             </div>
//             <div className="modal-body">
//                 <div className='container-fluid'>
//                   <div className='d-flex flex-column justify-content-center'>
//                     <h4 className='mb-5'>Quieres Escanear El Codigo: {codigo}</h4>
//                     <div className='row g-0 text-center'>
//                       <div className='col-6 col-lg-6'>
//                         <button className='btn btn-success px-5' onClick={accessF} data-bs-dismiss="modal" aria-label="Close">SI</button>
//                       </div>
//                       <div className='col-6 col-lg-6'>
//                         <button className='btn btn-danger px-5' onClick={deniedF} data-bs-dismiss="modal" aria-label="Close">NO</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
//     </>
//   )
// }
