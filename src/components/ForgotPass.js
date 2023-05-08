import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ForgotPass = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "", cpassword: ""});
    const [dob, setDOB] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(credentials.password !== credentials.cpassword){
          return props.showAlert("warning", "Confirm Your Password Correctly");
        }
        //API call
        const response = await fetch(`${props.host}/api/auth/newpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, dob: dob, password: credentials.password})
        });

        const json = await response.json();

        if(json.success){
          props.showAlert("success", "Password Updated Successfully!");
          //redirect
          navigate("/login");
        }
        else{ 
          props.showAlert("error", json.error);
        }
    }

    const onBlurFunc = (e) => {
        e.target.setAttribute('type','text');
        if(dob[2] !== '-')
            setDOB(dob.split("-").reverse().join("-"))
    }

  return (
    <div className='container newPassword'>
      <form className="Form" onSubmit={handleSubmit}>
      <i className="my-2 fa-solid fa-circle-exclamation forgotIcon"></i>
        <h2 className="heading">Forgot Password</h2>
        <div className="form-group">
          <input type="email" className="form-control authForm" id="email" name="email" onChange={handleChange} value={credentials.email} aria-describedby="emailHelp" placeholder='Email Address'/>
        </div>
        <div className="form-group">
        <input type="text" id="dob" placeholder="Date of Birth" className='form-control authForm' required value={dob}
            onChange={(e) => {setDOB(e.target.value)}} onFocus={(e) => {e.target.setAttribute('type','date')}} onBlur={onBlurFunc}></input>
        </div>
        <div className="form-group">
          <input type="password" className="form-control authForm" id="password" name="password" onChange={handleChange} value={credentials.password} minLength={8} required placeholder='New Password'/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control authForm" id="cpassword" name="cpassword" onChange={handleChange} value={credentials.cpassword} minLength={8} required placeholder='Confirm Password'/>
        </div>
        <button type="submit" className="authButton">Change Password</button>
      </form>
      <div className="credentials"><Link to="/login" className="authLinks">&lt; Back to Login</Link></div>
      <div className="credentials"><Link to="/signup" className="authLinks">Create a new account</Link></div>
    </div>
  )
}

export default ForgotPass
