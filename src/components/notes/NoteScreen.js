import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active:note} = useSelector( state => state.notes );
  //console.log(note)
  const [formValues, handleInputChange, reset] = useForm(note)
  //console.log(formValues) //aqui se guardan todas las propiedades de la nota
  const {body, title, id} = formValues

  //en activeId esta el id de la nota seleccionada
  const activeId = useRef(note.id)//este hoock me permite almacenar una variable mutable q no redibuja todo el componente si cambia

  useEffect(() => {
    //solo se activa si la nota.id cambio y si cambio se actualiza el nuevo id en activeId.current=
    if(note.id !== activeId.current){//activeId.current da el valor actual

      reset(note)
      activeId.current=note.id
    }
    
    
  }, [note,reset])
  
  useEffect(() => {
    
    dispatch(activeNote(formValues.id,{...formValues}))//dispatch para actualizar la nota activa
    
  }, [formValues,dispatch])
  
  const handleDelete = () => {
    
    //el id lo cogemos de la desestructuracion del form value
    dispatch(startDeleting(id))
  }

  return (
    <div className='notes__main-content'>
    
        <NotesAppBar />

        <div className='notes__content'>
          <input 
            type='text'
            placeholder='Some awesome title'
            className='notes__title-input'
            autoComplete='off'
            name='title'
            value={title}
            onChange={handleInputChange}
          />

          <textarea 
          placeholder='what happened today' 
          className='notes__textarea'
          name='body'
          value={body}
          onChange={handleInputChange}></textarea>

          {//'https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png'
            note.url &&
            (<div className='notes__image'>
            <img src={note.url}
              alt='imagen'
            />
          </div>)
          }
          

        </div>

        <button className='btn btn-danger'
        onClick={handleDelete}>
            Delete
        </button>

    </div>
  )
}
