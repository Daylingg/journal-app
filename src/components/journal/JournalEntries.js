import React from 'react'
import { JournalEntry } from './JournalEntry'
import { useSelector } from 'react-redux'

export const JournalEntries = () => {

    //const entries= [1,2,3,4,5]
    const {notes} = useSelector( state => state.notes );
    //console.log(notes)

  return (
    <div className='journal__entries'>
        {/*
            entries.map(value =>(//se recorre el arreglo y por cada uno se llama al componente journalentry
                <JournalEntry key={value} />
            ))*/
            notes.map(note=>(
              <JournalEntry 
                key={note.id} 
                {...note}//se extraen las propiedades de los note para q se muestren en la barra
              />
            ))
        }
    </div>
  )
}
