import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import {useDispatch, useSelector} from 'react-redux'
import { startGoogleLogin, startLoginEmailPass } from '../../actions/auth'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const {msjError,loading} = useSelector( state => state.ui );

    const [formValues,handleInputChange] = useForm({
        email:'day@gmail.com',
        password:'123456'
    })

    const {email,password} = formValues

    const handleLogin=(e)=>{
        e.preventDefault()
        if( isFormValid()){
        dispatch(startLoginEmailPass(email,password))
        //dispatch( login( 12345, 'Daylin'));//al dispatch se le manda la accion del login q lo q tiene es el uid y el nombre
        }
    }

    const isFormValid = () => {

        if (!validator.isEmail(email)){//si no es un email q haga lo siguiente
            dispatch(setError('el email es incorrecto'))
          //console.log('el email es incorrecto')
            return false
        }else if(password.length < 5){
            dispatch(setError('La contraseña no puede tener menos de 6 caracteres'))
          //console.log('Las contraseñas no son iguaales o son menores de 6 caracteres')
            return false
        }
    
        dispatch(removeError())
        return true
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin()) 
    }

    return (
    <>
        <h3 className='auth__title'>LoginScreen</h3>

        <form onSubmit={handleLogin} 
        className='animate__animated animate__fadeIn animate__faster'
        >

        {//si msjError es distinto de null saca el msj
            msjError &&
            (<div className='auth__alert-error'>
            {msjError}
            </div>)
        }

            <input className='auth__input' type='text'
            placeholder='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={handleInputChange}
            />
            <input className='auth__input' type="password"
            placeholder='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            />

            <button 
            className='btn btn-primary btn-block' 
            type='submit' 
            disabled={ loading }>
                Login
            </button>
            
            <div className='auth__social-networks'>
                <p>Login with social networks</p>
                <div className="google-btn" >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text"
                    onClick={handleGoogleLogin}>
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>
            <Link className='link' to='/auth/register'>Create new Account</Link>
        </form>
    </>
  )
}
