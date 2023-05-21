import { types } from "../types/types"

const initialState={
    notes:[],
    active:null
}

export const notesReducer = (state=initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            return{
                ...state,//se clona el estado anterior para no mutarlo
                active:{ //se devuelve tambien la nota activa q va a ser un obj q esta en el payload
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return{
                ...state,
                notes:[action.payload, ...state.notes]//se desestructura el ...state.notes para obtener una nueva copia de las notas
            }    
        
        case types.notesLoad:
            return{
                ...state,
                notes: [...action.payload] //esparso el arreglo con el spread operator ...
            }

        case types.notesUpdate:
            return{
                ...state,
                notes: state.notes.map(//necesito modificar la nota dentro de notes...para eso uso el .map q devuelve otro arreglo
                    note => note.id===action.payload.id //si la nota.id es igual al action.payload.id quiere decir q es la nota q voy a actualizar
                    ?action.payload.note
                    :note //si no hay modificacion se devuelve la nota como esta
                )
            }    
    
        case types.notesDelete:
        return{
            ...state, //se esparcen todas las propiedades del state con el spread operator
            active: null,
            notes:state.notes.filter(note => note.id !==action.payload)//las nota va a ser igual a las notas menos la q tenga el id q estoy filtrando....filter crea un nuevo array con las notas cuyos id sean diferentes del q se esta pasando
        }

        case types.notesLogoutCleanig:
            return{ 
                ...state,
                active:null,
                notes:[]
             }

        default:
            return state
    }
}