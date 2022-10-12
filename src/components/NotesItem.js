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
    <div className="col-sm-6">
    <div className="card m-1 bg-dark">
      <div className="card-body">

        <h5 className="card-title text-light">{note.title}</h5>
        <p className="card-text text-light">{note.description}</p>

        <div className="features">
          <button className="BtnAddnote">Open</button>
          <i className="fa-solid fa-pen-to-square mx-2 text-light" onClick={handleEditClick}></i>
          <i className="fa-solid fa-trash-can mx-2 text-light" onClick={handleDelete} ></i>
        </div>

      </div>
    </div>
  </div>
  )
}

export default NotesItem
