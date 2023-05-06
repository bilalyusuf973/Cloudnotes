import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";

const FetchedNotes = (props) => {
  const context = useContext(NoteContext);
  const {notes, getNotes, editNote} = context;
  const {setNotes, showAlert} = props;
  const [note, setNote] = useState({id: "", editTitle: "", editDescription: "", editTag: "", ecode: "", eLang: ""});

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
    setNote({id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag, ecode: currentNote.code, eLang: currentNote.lang});
  }

  const handleChange = () => {
    const editTitle = document.getElementById("editTitle").value;
    const editDescription = document.getElementById("editDescription").value;
    const editTag = document.getElementById("editTag").value;
    const ecode = document.getElementById("ecode").value;
    const eLang = document.getElementById("languageEditor").value;
    const id = note.id;

    setNote({id, editTitle, editDescription, editTag, ecode, eLang});
  }
  
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.editTitle, note.editDescription, note.editTag, note.ecode, note.eLang);
    showAlert("success", "Note Edited Successfully!");
  }

  const addnotesFunc = () => {
    setNotes({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here", lang: "cpp"})
    navigate("/");
  }

  return (
    <>
      <button type="button" ref={myRef} className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Edit Note </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="modalCloseBtn">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label"> Title: </label><br />
            <input type="text" className="editInput" id="editTitle" name="title" value={note.editTitle} aria-describedby="title" onChange={handleChange}/>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label"> Description: </label><br />
            <textarea type="textarea" className="editTextarea" id="editDescription" value={note.editDescription} name="description" onChange={handleChange}/>
          </div>

          <div className="enotesArea">
          <label htmlFor="code" className="form-label"> Code: </label><br />
            <textarea type="textarea" id='ecode' placeholder="Paste your code here" value={note.ecode} onChange={handleChange}/>
          </div>

          <div className="editLangTag">
            <div className="editLang">
              <label htmlFor="lang" className="form-label"> Language: </label><br/>
              <select id="languageEditor" value={note.eLang} onChange={handleChange}>
                <option value="cpp">C++</option>
                <option value="javascript">Javascript</option>
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">Typescript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="xml">XML</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="swift">Swift</option>
              </select>            
            </div>
            <div className="editTag">
              <label htmlFor="tag" className="form-label"> Tag: </label><br/>
              <select name="format" className="editSelect" id="editTag" onChange={handleChange} value={note.editTag}>
                  <option value="Personal" name="Personal">Personal</option>
                  <option value="Professional" name="Professional">Professional</option>
                  <option value="General" name="General">General</option>
                  <option value="Special" name="Special">Special</option>
                  <option value="Random" name="Random">Random</option>
              </select><br/>
            </div>
          </div>


          </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="BtnUpdatenote" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <h3 className="my-4">All Notes</h3>
        {notes.length === 0 && <div className="my-5">
          <h6>Please add a note to display here...</h6>
          <button className="BtnAddnote" onClick={addnotesFunc}>Add Notes</button>
        </div>}
        {notes.length !== 0 && <div className="row">
          {notes.map((note) => {
            return <NotesItem key={note._id} note={note} handleEditClick={() => {handleEditClick(note)}} setNotes={setNotes} showAlert={showAlert}/>;
          })}
        </div>}
      </div>
    </>
  );
};

export default FetchedNotes;
