import React from 'react';
import { useState } from 'react';
import NoteContext from './NoteContext';

const host = "http://localhost:5000";

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);


  //get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setNotes(json);
  }


  //add a note
  const addNote = async (newNote) => {
    //API call
    await fetch(`${host}/api/notes/newnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(newNote)
    });

    setNotes(notes.concat(newNote));
  }
  

  //edit a note
  const editNote = async (noteID, title, description, tag) => {
    //API call
    await fetch(`${host}/api/notes/updatenote/${noteID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
  }


  //delete a note
  const deleteNote = async (noteID) => {
    //API call
    await fetch(`${host}/api/notes/deletenote/${noteID}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
  }

  return (
    <NoteContext.Provider value = {{notes, addNote, editNote, deleteNote, getNotes}}> 
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
