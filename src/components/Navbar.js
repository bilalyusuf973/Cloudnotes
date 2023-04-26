import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
    props.showAlert('success', 'Logout Successful!');
  }

  const location = useLocation();

  return (
    <>
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <nav className="navbar navbar-expand-md navbar-dark">
        <Link className="navbar-brand" to="/">
          <div className="navbarBrandDiv">
            <img src="cloudNotesIcon.png" width="60" height="43" className="d-inline-block align-top" alt="Cloudnotes"/>
            <div className="navbarBrandTitle">
              <b>Cloudnotes</b>
            </div>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className= {`navbar-link ${location.pathname === '/allnotes' ? "highlight" : ""}`} style={{textDecoration: 'none'}} to="/allnotes"> 
                All notes 
              </Link> 
            </li> 
            <li className="nav-item">
              <Link className= {`navbar-link ${location.pathname === '/' ? "highlight" : ""}`} style={{textDecoration: 'none'}} aria-current="page" to="/">
                New Note
              </Link>
            </li>
            <li className="nav-item">
              <Link className= {`navbar-link ${location.pathname === '/about' ? "highlight" : ""}`} style={{textDecoration: 'none'}} to="/about">
                 About Us
              </Link>
            </li>  
            <li className="navBtn " onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>  
      </nav>}
    </>
  );
};

export default Navbar;
