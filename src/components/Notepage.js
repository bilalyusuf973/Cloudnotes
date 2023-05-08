import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Navbar from './Navbar'

const Notepage = (props) => {

  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {addNote} = context;
  const {note, setNote, showAlert} = props;

  useEffect(() => {
    if(!localStorage.getItem('token') || !localStorage.getItem('cloudnotes_username')){
      navigate("/login");
    }
  });

  const handleChange = (e) => {
    setNote({...note, [e.target.id]: e.target.value});
  }

  const handleEditorChange = (val) => {
      setNote({...note, code: val});
  }
        
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("success", "Note Added Successfully!");
    setNote({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here", lang: "cpp"})  
    navigate("/allnotes");
  }

  const handleCopy1 = ()=>{
    if(note.title !== "")
      showAlert('success', 'Title Copied!');
    else
      showAlert('warning', 'Empty field!');
  }

  const handleCopy2 = ()=>{
    if(note.description !== "")
      showAlert('success', 'Description Copied!');
    else
      showAlert('warning', 'Empty field!');
  }
  const handleCopy3 = ()=>{
    if(note.code !== "")
      showAlert('success', 'Code Copied!');
    else
      showAlert('warning', 'Empty field!');
  }
  
  return (
    <>
      {localStorage.getItem('token') && localStorage.getItem('cloudnotes_username') && <Navbar setNote={setNote} showAlert={showAlert}/>}
      <div className='container'>
        <h2 className='newNoteHeading'>Create a new note</h2>
          <div className="inputField">
            <input type="text" placeholder="Title" id='title' onChange={handleChange} minLength={3} required value={note.title} />
            <span className='iconSpan'>        
              <CopyToClipboard text={note.title}
              onCopy={handleCopy1}>
                <i className="fa-regular fa-copy CopyIcon"/>
              </CopyToClipboard>
            </span>  
          </div>

          <div className="copydiv">
            <CopyToClipboard text={note.description}
              onCopy={handleCopy2}>
              <i className="fa-regular fa-copy CopyIcon"/>
            </CopyToClipboard>
          </div>
          <textarea type="textarea" placeholder="Description" id='description' onChange={handleChange} minLength={5} required value={note.description}/>


        <div className="copydiv">
          <div className="languageDiv">
            <select id="lang" value={note.lang} onChange={handleChange}>
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
          <CopyToClipboard text={note.code}
            onCopy={handleCopy3}>
            <i className="fa-regular fa-copy CopyIcon"/>
          </CopyToClipboard>
        </div>

        <div className="editorDiv">
          <Editor theme='vs-dark' className='codeArea' 
            height="38.99rem"
            width="99.72%"
            defaultLanguage={note.lang}
            language={note.lang}
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
                <option value="Special">Special</option>
                <option value="Random">Random</option>
                <option value="Professional">Professional</option>
            </select>
          </div>
          
          <button className='BtnAddnote' onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5 || note.tag === "" || note.code.length < 1}>Add note</button>
          
        </div>
      </div>
    </>
  )
}

export default Notepage
