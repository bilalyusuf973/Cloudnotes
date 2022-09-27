import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const {note, handleEditClick, showAlert}  = props;
    const {deleteNote} = context;

    const handleDelete = () => {
      deleteNote(note._id);
      showAlert("success", "Note Deleted Successfully");
    }

  return (
    <div className='col-md-3'>
<div className="card my-3 notesItem">
  <div className="card-body " >
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEditClick}></i>
    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete} ></i>
    </div>
    <p className="card-text">{note.description}</p>  
  </div>
</div>
    </div>
  )
}

export default NotesItem
