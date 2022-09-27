import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
          //redirect
          props.showAlert("success", "Logged in Successfully");
          localStorage.setItem('token', json.authToken);
          navigate("/");

        }
        else{
          props.showAlert("danger", "Invalid Credentials");
        }
    }

    const handleChange = ()=>{
       const email = document.getElementById("email").value;
       const password = document.getElementById("password").value;
       setCredentials({email, password});
    }

  return (
    <div>
    <form className="Form" onSubmit={handleSubmit}>
    <div className="divImage"><img className="authImage" src="/cloudNotesIcon.png" alt="icon" /></div>
      <h2 className="heading">Log in</h2>
      <div class="form-group">
        <input type="email" class="form-control authForm" id="email" name="email" onChange={handleChange} value={credentials.email} aria-describedby="emailHelp" placeholder='Enter Email'/>
      </div>
      <div class="form-group">
        <input type="password" class="form-control authForm" id="password" name="password" onChange={handleChange} value={credentials.password} placeholder='Password'/>
      </div>
      <button type="submit" class="authButton">Login</button>
    </form>
    <div className="credetials"><a href="/signup">Forgot Your Password?</a></div>
    <div className="credetials">Don't have an account?<a href="/signup">Sign up</a></div>
    </div>
  )
}

export default Login
