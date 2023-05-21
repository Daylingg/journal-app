import React from 'react'
import { AppRoter } from './routers/AppRoter'
import {Provider} from 'react-redux' //redux se importa en el archivo mas alto de la app q no sea el index
import { store } from './store/store'

export const JounarlApp = () => {
  return (
    <Provider store={store}>
      <AppRoter/>
    </Provider>
    
  )
}
