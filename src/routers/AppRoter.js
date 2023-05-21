import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
//import { LoginScreen } from '../components/auth/LoginScreen'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
//import { loadNotes } from '../helpers/loadNotes'
import {  startLoadingNotes } from '../actions/notes'

export const AppRoter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true) //se crea un estado locaal con una bandera...si esta en true no se muestra nada mas de la aplicacion

  const [isloggedIn, setIsloggedIn] = useState(false)

  useEffect(() => {

    onAuthStateChanged(auth, async (user)=>{//mantiene la informacion del usuario q esta logueado para q cuando se recargue la pag no se pierda esa info
      //console.log(user)
      if(user?.uid){//si el user tiene algo pregunta si existe el uid
        
        dispatch(login(user.uid, user.displayName))
        setIsloggedIn(true)//se cambia a true pq ya se logio un usuario

        //const notes = await loadNotes(user.uid)
        dispatch(startLoadingNotes(user.uid)) //se hace el dispatch de cargar las notas al loguearse un usuario, asi aparecen las notas del usuario en si
      }else{
        setIsloggedIn(false)//no se loguio el usuario
      }
      setChecking(false)//cuando se pone en false es pq ya tengo una respuesta del onAuthStateChanged
    })

  }, [dispatch,checking])
  
  if(checking){//si esta en true retorno un nuevo obj
    return (//buscar un loading animado para poner aqui
     <h1>Wait...</h1>
    )
    
  }

  return (
    <div>
        
        <Router>
            <Routes>
                <Route path='/auth/*' element={
                  <PublicRoute isAuthenticated={isloggedIn}>
                    <AuthRouter/>
                  </PublicRoute>
                } 

                />
                <Route path='/' element={
                  <PrivateRoute isAuthenticated={isloggedIn}>
                    <JournalScreen/>
                  </PrivateRoute>
                } 

                />
                <Route path='*' element={<Navigate to='/auth/login'/>} />
                
            </Routes>
        </Router>
    </div>
  )
}
