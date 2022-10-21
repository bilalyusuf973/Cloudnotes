import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Notepage = (props) => {

  const context = useContext(NoteContext);
  const {addNote} = context;
  
  const {note, setNote, showAlert} = props;

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
  }

  const handleCopy1 = ()=>{
    const copiedTitle = document.getElementById("title").value;
    if(copiedTitle !== ""){
      navigator.clipboard.writeText(copiedTitle);
      showAlert('success', 'Title Copied');
    }
    else{
      showAlert('warning', 'Title is empty');
    }
  }

  const handleCopy2 = ()=>{
    const copiedDescription = document.getElementById('description').value;
    if(copiedDescription !== ""){
      navigator.clipboard.writeText(copiedDescription);
      showAlert('success', 'Description Copied');
    }
    else{
      showAlert('warning', 'Description is empty');
    }
  }
  
  return (
    <div className='container'>

      <h2>Create new note</h2>
        <div className="inputField">
          <input type="text" placeholder="Title" id='title' onChange={handleChange} minLength={3} required value={note.title} />
          <span className='iconSpan'><i className="fa-regular fa-copy copyIcon1" onClick={handleCopy1}/></span>  
        </div>

        <div className="textareaField">
        <textarea type="textarea" placeholder="Description" id='description' onChange={handleChange} minLength={5} required value={note.description}/>
          <span className='iconSpan'><i className="fa-regular fa-copy copyIcon2" onClick={handleCopy2}/></span>  
        </div>

      <textarea type="textarea" id='codeArea' className="codeArea" placeholder="// Paste your code here" value={note.code} onChange={handleChange}/>

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
  )
}

export default Notepage
