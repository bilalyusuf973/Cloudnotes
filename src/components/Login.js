import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //API call
        const response = await fetch(`${props.host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();

        if(json.success){
          //redirect
          props.showAlert("success", "Login Successful!");
          localStorage.setItem('token', json.authToken);
          localStorage.setItem('cloudnotes_username', json.username);
          navigate("/allnotes");
        }
        else{
          props.showAlert("error", json.error);
        }
    }

    const handleChange = (e)=>{
       setCredentials({...credentials, [e.target.id]: e.target.value});
    }

  return (
    <div className='container loginForm'>
      <form className="Form" onSubmit={handleSubmit}>
      <div className="divImage"><img className="authImage" src="/cloudNotesIcon.png" alt="icon" /></div>
        <h2 className="heading">Log in</h2>
        <div className="form-group">
          <input type="email" className="form-control authForm" id="email" name="email" onChange={handleChange} value={credentials.email} aria-describedby="emailHelp" placeholder='Email Address'/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control authForm" id="password" name="password" onChange={handleChange} value={credentials.password} placeholder='Password'/>
        </div>
        <button type="submit" className="authButton">Login</button>
      </form>
      <div className="credentials"><Link to="/forgotpassword" className='authLinks'>Forgot Password?</Link></div>
      <div className="credentials">Don't have an account?&nbsp;<Link to="/signup" className='authLinks'>SIGNUP</Link></div>
    </div>
  )
}

export default Login
