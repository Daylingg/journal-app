import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPassName } from '../../actions/auth'

import Swal from 'sweetalert2';

export const RegisterSceen = () => {

  const dispatch = useDispatch();
  //const state = useSelector( state => state.ui );//desestructuro el state para obtener el msj de error de ui
  const {msjError} = useSelector( state => state.ui );
  //console.log(state)
  //console.log(msjError)

  const [formValues,handleInputChange] = useForm({
    name: 'Daylin',
    email:'day@gmail.com',
    password:'123456',
    password2:'123456'
})

const {name,email,password,password2} = formValues

const handleRegister = (e) => {
  e.preventDefault()
  //console.log(name,email,password,password2)
  if( isFormValid()){
    dispatch(startRegisterWithEmailPassName(email,password,name))
  }
}

const isFormValid = () => {

    if(name.trim().length === 0)
    {
      dispatch(setError('name is required'))
      
      //console.log('name is required')
      return false
    }else if (!validator.isEmail(email)){//si no es un email q haga lo siguiente
      dispatch(setError('el email es incorrecto'))
      //console.log('el email es incorrecto')
      return false
    }else if(password !== password2 || password.length < 5){
      dispatch(setError('Las contraseñas no son iguales o son menores de 6 caracteres'))
      Swal.fire('Error',msjError, 'error')
      //console.log('Las contraseñas no son iguaales o son menores de 6 caracteres')
      return false
    }

    dispatch(removeError())
  return true
}

  return (
    <>
        <h3 className='auth__title'>Register</h3>

        <form onSubmit={handleRegister}
        className='animate__animated animate__fadeIn animate__faster'
        >

        {//si msjError es distinto de null saca el msj
          msjError &&
          (<div className='auth__alert-error'>
          {msjError}
        </div>)
        }

            <input className='auth__input' type='text'
            placeholder='name'
            name='name'
            autoComplete='off'
            value={name}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='text'
            placeholder='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='password'
            placeholder='123456'
            name='password'
            value={password}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='password'
            placeholder='123456'
            name='password2'
            value={password2}
            onChange={handleInputChange}
            />
            <button className='btn btn-primary btn-block mb-5' type='submit'>
                Register
            </button>
            
           
            <Link className='link' to='/auth/login'>Alredy Register</Link>
        </form>
    </>
  )
}
