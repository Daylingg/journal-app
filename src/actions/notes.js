import Swal from 'sweetalert2'
import {collection, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore'
import { db } from "../firebase/firebaseConfig"
import { loadNotes } from '../helpers/loadNotes'
import { types } from '../types/types'
import { fileUpload } from '../helpers/fileUpload'


//react-journal..nomb en cloudinary
//https://api.cloudinary.com/v1_1/dlmg86obx
//https://res.cloudinary.com/dlmg86obx/image/upload/v1683305565/qsz3kphm5jqngcwtmrcm.jpg
//dispatch, getState salen del thunk q ofrece el Middleware para las acciones asincronas

export const startNewNote = () => {//tarea asincrona q es la accion para iniciar una nota

    return async(dispatch, getState) => {//getState es una funcion para obtener el state como se obtiene en el useSelector

        //const uid = getState().auth.uid //esto se desestructura mas para conseguir el uid del usuario registrado
        const {uid} = getState().auth
        //console.log(uid)

        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime()
        }

        //en la bd de firestore se actualizan las reglas para decir q solo se inserte si hay un usuario autenticado allow read, write: if request.auth!=null;
        //para grabar en la bd de firestore 
        const note = await addDoc(collection(db,`${uid}/journal/notes`),newNote) //espera q se haga la insercion en la bd
        
        //console.log(doc)
        dispatch(activeNote(note.id, newNote)) //esto hace el dispatch al reducer

        dispatch(addNewNote(note.id, newNote))
    }
}

//cuando ya tengo el startNewNote hay q mandarle una accion al reducer
//la nota activa debe tener el id de firestore mas todo lo demas q trae una nota
export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload:{
        id,
        ...note//para q se mantenga todo el formato de la nota
    }

})

export const addNewNote = (id, note) => ({

    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {

    return async(dispatch) => {
        const notes = await loadNotes(uid) //se cargan las notas segun el id
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes //el payload va a ser todas las notas q recibo como argumento
})

//para grabar en la bd una actualizacion
export const startSaveNote = (note) => {

    return async(dispatch, getState)=>{

        const {uid} = getState().auth//obtengo el id del usuario

        if(!note.url){//si no viene el url elimino el note.url
            delete note.url
        }

        const noteToFirestore = {...note}//obtengo toda la nota y con el spread operator.. separo los elementos
        delete noteToFirestore.id //despues de separar los elementos elimino el id pq ese no lo necesitamos a la hora de guardar la nota 

        const docRef = doc(db, `${uid}/journal/notes`, note.id);
        await updateDoc(docRef, noteToFirestore)
        /*const docRef = doc(db, 'items', id);
    await updateDoc(docRef, obj)*/

        dispatch(refreshNote(note.id, noteToFirestore))//se manda a refrescar solo la nota q se actualizo

        Swal.fire('Saved', note.title, 'success')
        
    }
}

//para refrescar solo una nota segun el id
export const refreshNote = (id, note) => ({
    type:types.notesUpdate,
    payload:{
        id, 
        note:{ //de esta manera me aseguro q la nota tambien tenga el id
            id, ...note }
    }
})

//accion para tarea asincrona
export const startUpLoading = (file) => {
    return async (dispatch, getState)=>{

        const {active: activeNote} = getState().notes //se hace referencia a la nota activa

        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {//de esta manera se llama a un loading q no se pude cerrar
                Swal.showLoading();
            },
        })

        const fileUrl = await fileUpload(file)//se llama la funcion fileUpload para subir el fichero
        activeNote.url = fileUrl//se le pone a la nota activa el url q sacamos de cloudinary

        //console.log(fileUrl)

        dispatch(startSaveNote(activeNote))//se hace el dispatch para grabar en la bd la nota con la nueva url

        Swal.close() //se cierra el loading cuando carga el archivo
    }
}


export const startDeleting = (id) => {

    return async (dispatch,getState) => {

        const uid = getState().auth.uid //se saca el id del usuario
        
        const docRef = doc(db, `${uid}/journal/notes`, id) //se busca en la bd la nota segun el id del usuario y el id de la nota seleccionada

        await deleteDoc(docRef) //se elimina la nota de la bd

        //hay q eliminar la nota del store para quitarla fisicamente de la aplicacion

        dispatch(deleteNote(id))
    }
} 

//accion para modificar el store 
export const deleteNote = (id) => ({

    type:types.notesDelete,
    payload:id
})


export const noteLogout = () => ({
    type: types.notesLogoutCleanig
})