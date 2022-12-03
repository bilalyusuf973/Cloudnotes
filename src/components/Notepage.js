import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Notepage = (props) => {

  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {addNote} = context;
  
  const {note, setNote, showAlert} = props;

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/login");
    }
  });

  const handleChange = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tag = document.getElementById("tag").value;
    const code = document.getElementById("codeArea").value;

    setNote({title, description, tag, code});
  }
        
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("success", "New Note Added Successfully");
    setNote({title: "", description: "", tag: "--- Tag ---", code: ""})  
    navigate("/allnotes");
  }

  const handleCopy1 = ()=>{
    const copiedTitle = document.getElementById("title").value;
    if(copiedTitle !== ""){
      navigator.clipboard.writeText(copiedTitle);
      showAlert('success', 'Title Copied');
    }
    else{
      showAlert('warning', 'Empty field');
    }
  }

  const handleCopy2 = ()=>{
    const copiedDescription = document.getElementById('description').value;
    if(copiedDescription !== ""){
      navigator.clipboard.writeText(copiedDescription);
      showAlert('success', 'Description Copied');
    }
    else{
      showAlert('warning', 'Empty field');
    }
  }
  const handleCopy3 = ()=>{
    const copiedCode = document.getElementById('codeArea').value;
    if(copiedCode !== ""){
      navigator.clipboard.writeText(copiedCode);
      showAlert('success', 'Code Copied');
    }
    else{
      showAlert('warning', 'Empty field');
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
        <i className="fa-regular fa-copy CopyIcon" onClick={handleCopy3}/>
      </div>
      <textarea type="textarea" id='codeArea' className="codeArea" required placeholder="Paste your code here" value={note.code} onChange={handleChange}/>



      {/* <div className="editor" contentEditable='true'>
        <SyntaxHighlighter language="javascript" style={stackoverflowDark}  wrapLines='true' showLineNumbers wrapLongLines='true' customStyle={{  
          height: "39.03rem",
        }}>
            {note.code}
        </SyntaxHighlighter>
      </div> */}

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
