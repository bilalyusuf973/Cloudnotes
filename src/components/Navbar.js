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
      {(location.pathname === "/" || location.pathname === "/allnotes") && <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <Link className="navbar-brand text-white" to="/">
          <img src="cloudNotesIcon.png" width="40" height="30" className="d-inline-block align-top" alt=""/>
          Cloudnotes
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">
                About
              </Link>
            </li>  
            <li className="nav-item">
              {location.pathname === "/" && <Link className="nav-link text-light" to="/allnotes">All notes</Link>}
            </li> 
          </ul>

          <div className="navBtn " onClick={handleLogout}>
            Logout
          </div>

        </div>  
      </nav>}
    </>
  );
};

export default Navbar;
