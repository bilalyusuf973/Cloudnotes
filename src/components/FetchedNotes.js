import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";

const FetchedNotes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote} = context;
  const {showAlert} = props;
  const [note, setNote] = useState({id: "", editTitle: "", editDescription: "", editTag: ""});

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }

    else{
      navigate("/login");
    }
  });

  const myRef = useRef(null);
  const refClose = useRef(null);
  const handleEditClick = (currentNote) => {
    myRef.current.click();
    setNote({id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag});
  }

  const handleChange = () => {
    const editTitle = document.getElementById("editTitle").value;
    const editDescription = document.getElementById("editDescription").value;
    const editTag = document.getElementById("editTag").value;
    const id = note.id;

    setNote({id, editTitle, editDescription, editTag});
  }
  
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.editTitle, note.editDescription, note.editTag);
    showAlert("success", "Note Edited Successfully");
  }

  return (
    <>
      <button type="button" ref={myRef} className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="editTitle" name="title" value={note.editTitle} aria-describedby="title" onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea type="textarea" className="form-control" id="editDescription" value={note.editDescription} name="description" onChange={handleChange}/>
          </div>
          <label htmlFor="tag" className="form-label">
              Choose a Tag
          </label><br/>
          <select className="form-select my-2" id="editTag" onChange={handleChange} value={note.editTag}>
              <option value="Personal" name="Personal">Personal</option>
              <option value="Professional" name="Professional">Professional</option>
              <option value="General" name="General">General</option>
              <option value="Special" name="Special">Special</option>
              <option value="Random" name="Random">Random</option>
          </select><br/>
          </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <h5>Your Notes</h5>
        <div className="my-4">
          {notes.length === 0 && 'Please add a note to display here'}
        </div>
        <div className="row">
          {notes.map((note) => {
            return <NotesItem key={note._id} note={note} handleEditClick={() => {handleEditClick(note)}} showAlert={showAlert}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default FetchedNotes;
