import React, { useState, useContext } from "react";
import FetchedNotes from "./FetchedNotes";
import NoteContext from "../context/notes/NoteContext";

const Home = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: "General"});
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
    setNote({title: "", description: "", tag: "General"})  
  }
  
  return (
    <div>
      <div className="container">
        <h5 className="my-4">Add a Note</h5>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" id="title" name="title" aria-describedby="title" onChange={handleChange} minLength={3} required value={note.title} placeholder="Title"/>
          </div>
          <div className="mb-3">
            <textarea type="textarea" className="form-control" id="description" name="description" onChange={handleChange}  minLength={5} required value={note.description}  placeholder="Description"/>
          </div>
          <label htmlFor="tag" className="form-label">
              Choose a Tag:
          </label><br/> 
          <select className="form-select my-2" id="tag" onChange={handleChange} value={note.tag}>
              <option value="General" name="General">General</option>
              <option value="Personal" name="Personal">Personal</option>
              <option value="Professional" name="Professional">Professional</option>
              <option value="Special" name="Special">Special</option>
              <option value="Random" name="Random">Random</option>
          </select><br/>
          <button type="submit" className="btn btn-primary my-3" onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5}>
            Add Note
          </button>
        </form>
        <FetchedNotes showAlert={showAlert}/>
      </div>
    </div>
  );
};

export default Home;
