import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Alert from "./components/Alert";
// import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { useState } from "react";
import Notepage from "./components/Notepage";

function App() {
  const [alert, setAlert] = useState({type: "", msg: ""});

  const showAlert = (type, msg)=>{

    setAlert({type, msg});

    setTimeout(() => {
      setAlert({type: "", msg: ""});
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            {/* <Route path="/" element={<Home showAlert={showAlert}/>} /> */}
            <Route path="/" element={<Notepage showAlert={showAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
