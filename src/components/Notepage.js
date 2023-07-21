import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Navbar from './Navbar'

const Notepage = (props) => {

  const navigate = useNavigate();
  const { addNote } = useContext(NoteContext);
  const {note, setNote, showAlert} = props;

  useEffect(() => {
    if(!localStorage.getItem('token') || !localStorage.getItem('cloudnotes_username')){
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setNote(note)
  }, [setNote, note]);

  const handleChange = (key, value) => {
    setNote({...note, [key]: value});
  }
        
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("success", "Note Added Successfully!");
    setNote({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here", lang: "cpp"})  
    navigate("/allnotes");
  }

  const handleCopy = (key)=>{
    if(note[key] !== "")
      showAlert('success', `${key.charAt(0).toUpperCase() + key.slice(1)} Copied!`);
    else
      showAlert('warning', 'Empty field!');
  }

  const readFile = (file) => {
    // Promise to read file
    return new Promise((resolve, reject) => {
        // Create a FileReader instance
        let reader = new FileReader();
    
        // Read the file as text
        reader.readAsText(file);
    
        reader.onload = function() {
          resolve({result:reader.result, extension:file.name.substring(file.name.lastIndexOf('.'))});
        };
    
        reader.onerror = function() {
          reject(new Error('Error occurred while reading the file.'));
        };
    });
  }

  const selectFilePromise = (fileInput) => {
    // Promise to handle file processing
    return new Promise(function(resolve, reject) {
      // Listen for the file selection event
      fileInput.addEventListener('change', e => {
        resolve(e.target.files[0]);

        reject(new Error('No file Selected!'));
      });
    });
  }

  const importFile = async (fileInput) => {
    try {
      // Trigger the file selection dialog
      fileInput.click();

      // Wait for the promise to resolve
      const selectedFile = await selectFilePromise(fileInput);
      const {result, extension} = await readFile(selectedFile);
  
      let extension_2 = extension;
      const extensions = {'.py':'.python', '.js':'.javascript', '.rb':'.ruby', '.ts':'.typescript'};

      if(extension_2 in extensions)
        extension_2 = extensions[extension_2];
        
      extension_2 = extension_2.split('.')[1];

      setNote({...note, code: result, lang: extension_2});

    } catch (error) {
      alert(error.message);
    }
  }
  
  return (
    <>
      {localStorage.getItem('token') && localStorage.getItem('cloudnotes_username') && <Navbar setNote={setNote} showAlert={showAlert}/>}
      <div className='container'>
        <h2 className='newNoteHeading'>Create a new note</h2>
          <div className="inputField">
            <input type="text" placeholder="Title" id='title' onChange={e => {handleChange(e.target.id, e.target.value)}} minLength={3} required value={note.title} />
            <span className='iconSpan'>        
              <CopyToClipboard text={note.title}
              onCopy={() => {handleCopy('title')}}>
                <i className="fa-regular fa-copy CopyIcon"/>
              </CopyToClipboard>
            </span>  
          </div>

          <div className="copydiv">
            <CopyToClipboard text={note.description}
              onCopy={() => {handleCopy('description')}}>
              <i className="fa-regular fa-copy CopyIcon"/>
            </CopyToClipboard>
          </div>
          <textarea type="textarea" placeholder="Description" id='description' onChange={e => {handleChange(e.target.id, e.target.value)}} minLength={5} required value={note.description}/>


        <div className="copydiv">
          <div className="languageDiv">
            <select id="lang" value={note.lang} onChange={e => {handleChange(e.target.id, e.target.value)}}>
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
          <div className='upload_copy'>
            <form encType="multipart/form-data">
              <input type="file" id="file" name="file" accept=".c,.cpp,.java,.py,.php,.js,.html,.css,.json,.xml,.swift,.go,.rb,.ts"/>
              <div className='upload' id='upload' onClick={() => {importFile(document.querySelector("#file"))}}><i className="fa-solid fa-file-import"></i></div>
            </form>
            <CopyToClipboard text={note.code}
              onCopy={() => {handleCopy('code')}}>
              <i className="fa-regular fa-copy CopyIcon"/>
            </CopyToClipboard>
            </div>
        </div>

        <div className="editorDiv">
          <Editor theme='vs-dark' className='codeArea' 
            height="38.99rem"
            width="99.72%"
            defaultLanguage={note.lang}
            language={note.lang}
            defaultValue="// Enter your code here"
            value={note.code}
            onChange={(value) => {handleChange('code', value)}}
          />
        </div>

        <div className="bottomdiv">

          <div className="select" >
            <select name="format" id="tag" required onChange={e => {handleChange(e.target.id, e.target.value)}} value={note.tag}>
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
