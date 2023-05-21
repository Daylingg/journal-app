import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { types } from '../types/types'
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';


export const startLoginEmailPass = (email, password) => {
    return (dispatch)=>{//se retorna un callback o sea otra funcion a la q se le pasa el dispatch de la accion del login

        dispatch(startLoading())

        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(
                login(user.uid, user.displayName)
            )
            dispatch(finishLoading())
        })
        .catch((e)=>{
            dispatch(finishLoading())
            Swal.fire('Error',e.message, 'error')
        })
        // setTimeout(() => {
        //     dispatch (login(123,'pepe'))
        // }, 3500);

    }
}


export const startRegisterWithEmailPassName = (email, password, name) => {

    return (dispatch) =>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(async({user})=>{

            //updateProfile se usa pq en el usser q devuelve a crear el usuario aparce el dis[playname como null y de esta manera actualizamos su valor con el valor q pasa el usuario]
            await updateProfile(user, {
                'displayName': name
                //'photoURL': 'erik.jpg' //admite foto tambien
            })

            //console.log(user)
            dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch(e=>{
            Swal.fire('Error',e.message, 'error')
        })
    }
}

//necesitamos el proveedor de google para autenticarse por ahi
const googleProvider = new GoogleAuthProvider()

export const startGoogleLogin = () => {

    return (dispatch)=>{

        signInWithPopup(auth,googleProvider)
        .then(({user})=>{//el user se desestructura para extraer el usuario y obtener los datos q necesitamos de ahi
            dispatch(
                login(user.uid, user.displayName)
            )
        })

    }

}


export const login = (uid, displayName) => ({
    
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }   
)

//lo de arriba tambien puede expresarse de esta manera pero es la manera larga...aqui hay un return q devuelve un obj y se puede sustituir por los parentesis y las llaves dentro
// export const login=(uid, displayName)=>{
//     return {
//         types: types.login,
//         payload:{
//             uid,
//             displayName
//         }
//     }    
// }

export const startLogout = () => {
    return async(dispatch) => {
        await signOut(auth)

        dispatch(logout())

        dispatch(noteLogout ())
    }
}

export const logout =()=>({
    type: types.logout
})