import { useState } from "react";

export const useForm = ( initialForm = {}) => {
    
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            //valor Computarizado... encuentra el objeto amodificar con la refencia "name"
            [name] : value
            
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const handleChangeValueObject = (target = "", value = "") => {
        onInputChange({
            target: {
                name: target,
                value: value
            }
        });
    }
  
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState,
        handleChangeValueObject
    }
    
}

/*

FORM EXAMPLE

<input
    type="text"
    className='form-control'
    placeholder='Username'
    name='username'
    value={username}
    onChange= {onInputChange}
/>

const {formState, onInputChange, onResetForm,  username, email, password} = useForm({
    username: '',
    email: '',
    password: '',
});


*/