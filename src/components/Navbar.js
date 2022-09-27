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
    {location.pathname === "/" && <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/login">
        <img src="cloudNotesIcon.png" width="40" height="30" className="d-inline-block align-top" alt=""/>
        Cloudnotes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "text-blue" : "text-white"}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "text-blue" : "text-white"}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <button className="BtnLogout ml-auto" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>}
    </>
  );
};

export default Navbar;
