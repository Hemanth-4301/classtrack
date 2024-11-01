import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import { FiLogOut } from "react-icons/fi";

function Navbar({ onContactClick }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(!!localStorage.getItem("authToken"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(false);
    navigate("/login");
  };

  return (
    <nav>
      <input type="checkbox" id="sidebar-active" />
      <img
        className="bug1 logo z-30"
        src={logo}
        height={50}
        width={50}
        alt="logo"
      />
      <label htmlFor="sidebar-active" className="hamburger open-sidebar-button">
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>

      <div className="link-container">
        <label htmlFor="sidebar-active" className="close-sidebar-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </label>
        <Link to="/" className="home-link">
          Home
        </Link>
        <Link to="/aboutus">About us</Link>
        <Link to="#" onClick={onContactClick}>
          Contact us
        </Link>
        {token ? <Link to="/admin">Admin panel</Link> : ""}

        {token ? (
          <Link onClick={handleLogout} to="/login" className="logout-button">
            Logout <FiLogOut size={23} style={{ marginLeft: "8px" }} />
          </Link>
        ) : (
          <Link to="/login">
            <FiLogIn size={23} style={{ marginRight: "8px" }}></FiLogIn> Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
