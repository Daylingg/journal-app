import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"


export const loadNotes = async (uid) => {//funcion para cargar las notas de un usuario

    const colRef =  collection(db,`${uid}/journal/notes`) //esta es la coleccion q queremos dentro del id del usuario en journal dentro de notes
    const notesSnap = await getDocs(query(colRef))//se obtienen las notas

    const notes = []
    //console.log(notesSnap)

    notesSnap.docs.map(snapHijo =>{
        //console.log(snapHijo.data())
        return notes.push({//se crea un nuevo arreglo con el id y la data de cada note
            id:snapHijo.id,
            ...snapHijo.data()//se mantiene el resto del body q esta en data
        })
    })

    //console.log(notes)

    return notes
}

/**export const getItems= async ()  => {
    const colRef = collection(db, 'items');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
*/