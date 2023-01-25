import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import { useState } from 'react';

const Notepage = (props) => {

  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {addNote} = context;
  
  const {note, setNote, showAlert} = props;

  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/login");
    }
  });

  const handleChange = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tag = document.getElementById("tag").value;
    const code = note.code;
    setLanguage(document.getElementById('languageSelector').value);

    setNote({title, description, tag, code});
  }

  const handleEditorChange = (val) => {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const tag = document.getElementById("tag").value;

      setNote({title, description, tag, code: val});
  }
        
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("success", "Note Added Successfully!");
    setNote({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here"})  
    navigate("/allnotes");
  }

  const handleCopy1 = ()=>{
    const copiedTitle = document.getElementById("title").value;
    if(copiedTitle !== ""){
      navigator.clipboard.writeText(copiedTitle);
      showAlert('success', 'Title Copied!');
    }
    else{
      showAlert('warning', 'Empty field!');
    }
  }

  const handleCopy2 = ()=>{
    const copiedDescription = document.getElementById('description').value;
    if(copiedDescription !== ""){
      navigator.clipboard.writeText(copiedDescription);
      showAlert('success', 'Description Copied!');
    }
    else{
      showAlert('warning', 'Empty field!');
    }
  }
  const handleCopy3 = ()=>{
    const copiedCode = note.code;
    if(copiedCode !== ""){
      navigator.clipboard.writeText(copiedCode);
      showAlert('success', 'Code Copied!');
    }
    else{
      showAlert('warning', 'Empty field!');
    }
  }
  
  return (
    <div className='container'>

      <h2 className='newNoteHeading'>Create a new note</h2>
        <div className="inputField">
          <input type="text" placeholder="Title" id='title' onChange={handleChange} minLength={3} required value={note.title} />
          <span className='iconSpan'><i className="fa-regular fa-copy CopyIcon" onClick={handleCopy1}/></span>  
        </div>

        <div className="copydiv">
          <i className="fa-regular fa-copy CopyIcon" onClick={handleCopy2}/>
        </div>
        <textarea type="textarea" placeholder="Description" id='description' onChange={handleChange} minLength={5} required value={note.description}/>


      <div className="copydiv">
        <div className="languageDiv">
          <select id="languageSelector" defaultValue="javascript" onChange={handleChange}>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="typescript">TypeScript</option>
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
        <i className="fa-regular fa-copy CopyIcon" onClick={handleCopy3}/>
      </div>

      <div className="editorDiv">
        <Editor theme='vs-dark' className='codeArea' 
          height="39rem"
          width="99.6%"
          defaultLanguage='javascript'
          language={language}
          defaultValue="// Enter your code here"
          value={note.code}
          onChange={handleEditorChange}
        />
      </div>

      <div className="bottomdiv">

        <div className="select" >
          <select name="format" id="tag" required onChange={handleChange} value={note.tag}>
              <option value="--- Tag ---" disabled >--- Tag ---</option>
              <option value="General">General</option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Special">Special</option>
              <option value="Random">Random</option>
          </select>
        </div>
        
        <button className='BtnAddnote' onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5 || note.tag === "" || note.code.length < 1}>Add note</button>
        
      </div>
    </div>
  )
}

export default Notepage
