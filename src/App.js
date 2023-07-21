import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import { useState } from "react";
import Notepage from "./components/Notepage";
import FetchedNotes from "./components/FetchedNotes";
import ForgotPass from "./components/ForgotPass";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [note, setNote] = useState({title: "", description: "", tag: "--- Tag ---", code: "// Enter your code here", lang: "cpp"});
  const host = "http://localhost:8010";

  const notify = (type, msg) => {
    toast(msg, {type: `${type}`, toastId: `${type}`});
  }

  return (
    <>
      <NoteState host={host}>
        <Router>
          <Routes>
            <Route path="/" element={<Notepage note={note} setNote={setNote} showAlert={notify}/>} />
            <Route path="/about" element={<About setNote={setNote} showAlert={notify}/>} />
            <Route path="/login" element={<Login showAlert={notify}/>}/>
            <Route path="/signup" element={<Signup showAlert={notify}/>}/>
            <Route path="/allnotes" element={<FetchedNotes setNotes={setNote} showAlert={notify}/>} />
            <Route path="/forgotpassword" element={<ForgotPass showAlert={notify}/>} />
          </Routes>
          <ToastContainer position="top-center" autoClose={600} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} draggable theme="colored"/>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
