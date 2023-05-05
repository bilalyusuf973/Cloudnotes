import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const NotesItem = (props) => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const {note, handleEditClick, setNotes, showAlert} = props;
    const {deleteNote} = context;

    const languages = {"cpp": "C++", "python": "Python", "php": "PHP", "swift": "Swift", "go": "Go", "xml": "XML", "javascript": "Javascript", "c": "C", "java": "Java", "typescript": "Typescript", "html": "HTML", "css": "CSS", "json": "JSON", "ruby": "Ruby"};

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
        <div className="noteTitleDiv">
          <h5 className="card-title">{note.title}</h5>
          <div className="langTagDiv">
            <div className="langDiv">
              <i className="fa-solid fa-circle langIcon"></i>
              &nbsp;{languages[note.lang]}
            </div>
            <div className="tagDiv">
              <i className="fa-solid fa-tag tagIcon"></i>
              &nbsp;{note.tag}
            </div>
          </div>
        </div>
        <p className="card-text text-light noteDescription">{note.description}</p>

        <div className="features">
          <button className="BtnOpennote" onClick={OpenNote}>Open</button>
          <div className="editDeleteIcons">
            <i className="editIcon fa-solid fa-pen-to-square mx-2" onClick={handleEditClick}></i>
            <i className="deleteIcon fa-solid fa-trash-can mx-2" onClick={handleDelete} ></i>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}

export default NotesItem
