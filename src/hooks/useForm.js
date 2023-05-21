import { useState } from "react"



export const useForm = (initialState={}) => {//el use form recibe un obj
    const [values, setValues] = useState(initialState)

    const reset=(newFormState = initialState)=>{ //si el newFormState no es enviado entonces sera igual al estado inicial
        setValues(newFormState)//de esta manera reseteamos el formulario...dejarlo limpio...y podemos establecer los valores q queramos en el formulario
    }

    const handleInputChange=({target})=>{//se desestructura el evento e para usar el target directamente
        setValues(
            {
                ...values,
                [target.name]:target.value
            }
        )
    }
    
    return [values,handleInputChange, reset]
}