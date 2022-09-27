import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import FetchedNotes from './FetchedNotes';

const Notepage = (props) => {

  const context = useContext(NoteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const {showAlert} = props;

  const handleChange = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tag = document.getElementById("tag").value;

    setNote({title, description, tag});
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("success", "New Note Added Successfully");
    setNote({title: "", description: "", tag: ""})  
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

      <h2>Create a new note</h2>

      <div className="titlediv my-4">
        <div className="inputField">
          <input type="text" placeholder="Title" id='title' onChange={handleChange} minLength={3} required value={note.title} />
          <span className='iconSpan'><i className="fa-regular fa-copy copyIcon1" onClick={handleCopy1}/></span>  
        </div>
      </div>

      <div className="descriptiondiv">
        <div className="textareaField">
        <textarea type="textarea" placeholder="Description" id='description' onChange={handleChange} minLength={5} required value={note.description}/>
          <span className='iconSpan'><i className="fa-regular fa-copy copyIcon2" onClick={handleCopy2}/></span>  
        </div>
      </div>

      <div className="select" >
        <select name="format" id="tag" required onChange={handleChange}>
            <option value="" disabled selected>--- Choose a Tag ---</option>
            <option value="General">General</option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
            <option value="Special">Special</option>
            <option value="Random">Random</option>
        </select>
      </div>
      
      <button className='BtnAddnote' onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5 || note.tag === ""}>Add note</button>
      <FetchedNotes showAlert={showAlert}/>
    </div>
  )
}

export default Notepage
