import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{

      e.preventDefault();

      if(credentials.password !== credentials.cpassword){
        return props.showAlert("warning", "Confirm Your Password Correctly");
      }
      //API call
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });

      const json = await response.json();

      if(json.success){
        //redirect
        props.showAlert("success", "Account Created Successfully!");
        localStorage.setItem('token', json.authToken);
        navigate("/");

      }
      else{
        props.showAlert("error", "Invalid Credentials!");
      }
  }

  const handleChange = ()=>{
     const name = document.getElementById("fullname").value;
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;
     const cpassword = document.getElementById("confirmPassword").value;
     setCredentials({name, email, password, cpassword});
  }
  return (
    <div className='signupForm'>
        <form className="Form" onSubmit={handleSubmit}>
          <div className="divImage"><img className="authImage" src="/cloudNotesIcon.png" alt="icon" /></div>
        <h2 className="heading">Sign up</h2>
        <div className="mb-3">
            <input type="text" className="form-control authForm" value={credentials.name} name="fullname" id="fullname" aria-describedby="fullname" onChange={handleChange} minLength={2} required placeholder='Full Name'/>
        </div>
        <div className="mb-3">
            <input type="email" className="form-control authForm" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={handleChange} required placeholder='Email address'/>
        </div>
        <div className="mb-3">
            <input type="password" className="form-control authForm" value={credentials.password} name="password" id="password" onChange={handleChange} minLength={8} required placeholder='Password'/>
        </div>
        <div className="mb-3">
            <input type="password" className="form-control authForm" value={credentials.cpassword} name="confirmPassword" id="confirmPassword" onChange={handleChange} minLength={8} required placeholder='Confirm Password'/>
        </div>
        <button type="submit" className="authButton">Sign Up</button>
        </form>
        <div className="credetials">Already have an account?<a href="/login">Log in</a></div>
    </div>
  )
}

export default Signup
