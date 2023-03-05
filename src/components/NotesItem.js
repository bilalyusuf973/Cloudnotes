import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const NotesItem = (props) => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const {note, handleEditClick, setNotes, showAlert}  = props;
    const {deleteNote} = context;

    const handleDelete = () => {
      deleteNote(note._id);
      showAlert("success", "Note Deleted Successfully!");
    }

    const OpenNote = () => {
      setNotes(note);
      navigate("/");
    }

  return (
    <div className="col-sm-6">
    <div className="card m-1">
      <div className="card-body">

        <h5 className="card-title">{note.title}</h5>
        <p className="card-text text-light">{note.description}</p>

        <div className="features">
          <button className="BtnAddnote" onClick={OpenNote}>Open</button>
          <i className="editicon fa-solid fa-pen-to-square mx-2" onClick={handleEditClick}></i>
          <i className="deleteicon fa-solid fa-trash-can mx-2" onClick={handleDelete} ></i>
        </div>

      </div>
    </div>
  </div>
  )
}

export default NotesItem
