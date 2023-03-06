import swal from "sweetalert";

const initAlert = {
    title: '',
    text: '',
    icon: 'success',
    button: 'OK',
    time: '10000',
}

export const alert = (alert = initAlert) => {
    swal(alert);
}

export const ErrorAlert = (alert = initAlert) => {
    swal({
        ...alert,
        icon: 'warning',
        title: 'UPPS'
    });
}

export const SuccessAlert = (alert = initAlert) => {
    swal({
        ...alert,
        icon: 'success',
        title: 'Excelente'
    });
}

//LIBRERIA PARA MANDAR ALERTAS CON DOC EN https://sweetalert.js.org/docs/