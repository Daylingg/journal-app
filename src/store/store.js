import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { authReducer } from '../reducers/authReducer'
import thunk from 'redux-thunk'
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//la funcion combine reducer se usa para especificar si son mas de un reducers ya q la funcion create store solo admite un reducer
//cuando se quiera añadir una nueva funcionalidad a la aplicacion se añade al reducer y se pasa mediante este al create storage
//se abre y cierran llaves {} dentro del parentisis () para especificar q es un obj
const reducers = combineReducers({ 
    auth:authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store =createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    )//con el composeEnhancers podemos trabajar acciones asincronas usando el applyMiddleware
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() para poder entrelazar el navegador con la app