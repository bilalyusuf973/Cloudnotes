import React from 'react';
import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);
  const [queryNotes, setQueryNotes] = useState([])

  const searchNotes = async (query) => {
    const response = await fetch(`${props.host}/api/notes/searchnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({query})
    });
    
    const json = await response.json();
    if(json.success) setQueryNotes(json.notes);
  }


  //get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${props.host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    if(json.success) setNotes(json.notes);
  }


  //add a note
  const addNote = async (newNote) => {
    //API call
    const res = await fetch(`${props.host}/api/notes/newnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(newNote)
    });

    const json = await res.json();
    if(json.success) setNotes(notes.concat(newNote));
  }
  

  //edit a note
  const editNote = async (noteID, title, description, tag, code, lang) => {
    //API call
    await fetch(`${props.host}/api/notes/updatenote/${noteID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag, code, lang})
    });
  }


  //delete a note
  const deleteNote = async (noteID) => {
    //API call
    await fetch(`${props.host}/api/notes/deletenote/${noteID}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
  }

  return (
    <NoteContext.Provider value = {{notes, queryNotes, addNote, editNote, deleteNote, getNotes, searchNotes}}> 
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
