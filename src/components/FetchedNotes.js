import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";
import Editor from "@monaco-editor/react";
import Navbar from './Navbar'

const FetchedNotes = (props) => {
  const context = useContext(NoteContext);
  const {notes, queryNotes, getNotes, editNote, searchNotes} = context;
  const {setNotes, showAlert} = props;
  const [note, setNote] = useState({id: "", editTitle: "", editDescription: "", editTag: "", eLang: ""});
  const [code, setCode] = useState("");
  const [query, setQuery] = useState("");

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
    setNote({id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag, eLang: currentNote.lang});
    setCode(currentNote.code);
  }

  const handleChange = (e) => {
    setNote({...note, [e.target.id]: e.target.value});
  }

  const handleEditorChange = (val) => {
    setCode(val);
  }
  
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.editTitle, note.editDescription, note.editTag, code, note.eLang);
    showAlert("success", "Note Edited Successfully!");
  }

  const addnotesFunc = () => {
    setNotes({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here", lang: "cpp"})
    navigate("/");
  }

  useEffect(() => {
    document.querySelector(".fa-xmark").style.visibility = "hidden";
  }, []);

  const searchBarHandle = (val) => {
    setQuery(val);
    document.querySelector(".fa-xmark").style.visibility = (val === "") ? "hidden" : "visible";
  }

  const searchResults = () => {
    if(query !== ""){
      searchNotes((query === "c++" || query === "C++") ? "cpp" : query);
      searchBarHandle("");
    }
  }

  // Add an event listener for the key press event on the input element
  document.querySelector(".searchBar")?.addEventListener("keypress", function(event) {
    // Check if the Enter key was pressed (key code 13)
    if (event.keyCode === 13) {
      // Trigger the click event on the button
      document.querySelector(".searchIcon")?.click();
    }
  });

  return (
    <>
      <Navbar setNote={setNotes} showAlert={showAlert}/>
      <div className='container'>
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
              <label htmlFor="editTitle" className="form-label"> Title: </label><br />
              <input type="text" className="editInput" id="editTitle" name="title" value={note.editTitle} aria-describedby="title" onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label htmlFor="editDescription" className="form-label"> Description: </label><br />
              <textarea type="textarea" className="editTextarea" id="editDescription" value={note.editDescription} name="description" onChange={handleChange}/>
            </div>

            <div className="enotesArea">
            <div className="mb-2"> Code: </div>
              <div className="editCodeArea">
                <Editor theme='vs-dark'
                  height="22.99rem"
                  width="99.72%"
                  defaultLanguage={note.eLang}
                  language={note.eLang}
                  defaultValue="// Enter your code here"
                  value={code}
                  onChange={handleEditorChange}
                />
              </div>
            </div>

            <div className="editLangTag">
              <div className="editLang">
                <label htmlFor="eLang" className="form-label"> Language: </label><br/>
                <select id="eLang" value={note.eLang} onChange={handleChange}>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="javascript">Javascript</option>
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
                <label htmlFor="editTag" className="form-label"> Tag: </label><br/>
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
        <h3 className="my-4">Search Notes:</h3>
        <div className="mb-5 searchFeature">
          <div className="searchDiv">
            <input type="text" className="searchBar" autoComplete="off" id="searchBar" placeholder="Enter Keywords..." value={query} onChange={e => searchBarHandle(e.target.value)}/>
            <div className="searchBtn"><i className="fa-solid fa-xmark clearQuery" onClick={() => {searchBarHandle("")}}></i><span className="verticalLine"></span><i className="fa-solid fa-magnifying-glass searchIcon" onClick={searchResults}></i></div>
          </div>
        </div>
        {queryNotes.length > 0 && <div className="results">
          <h3 className="my-4">Search Results:</h3>
          <div className="row">
            {queryNotes.map((note, index) => {
              return <NotesItem key={index} note={note} handleEditClick={() => {handleEditClick(note)}} setNotes={setNotes} showAlert={showAlert}/>
            })}
          </div>
        </div>}
        <div className="my-3">
          <h3 className="my-4">All Notes:</h3>
          {notes.length === 0 && <div className="my-5">
            <h6>Please add a note to display here...</h6>
            <button className="BtnAddnote" onClick={addnotesFunc}>Add Notes</button>
          </div>}
          {notes.length !== 0 && <div className="row">
            {notes.map((note, index) => {
              return <NotesItem key={index} note={note} handleEditClick={() => {handleEditClick(note)}} setNotes={setNotes} showAlert={showAlert}/>;
            })}
          </div>}
        </div>
      </div>
    </>
  );
};

export default FetchedNotes;
