import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  const location = useLocation();

  return (
    <>
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <nav className="navbar navbar-expand-md navbar-dark">
        <Link className="navbar-brand" to="/">
          <div className="navbarBrandDiv">
            <img src="cloudNotesIcon.png" width="40" height="30" className="d-inline-block align-top" alt="Cloudnotes"/>
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
              <Link className= "navbar-link" style={{textDecoration: 'none'}} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className= "navbar-link" style={{textDecoration: 'none'}} to="/about">
                 About us
              </Link>
            </li>  
            <li className="nav-item">
              <Link className="navbar-link" style={{textDecoration: 'none'}} to="/allnotes"> 
                All notes 
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
