import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

  const goTo = async (item) => {
    if (item === "/logout") {
      setNavbarOpen(false);
      handleLogout();
    }else{
      setNavbarOpen(false);
      history.push(item);
    }
  }
  
  async function handleLogout() {
    try {
      await logout()
      history.push("/login");
    } catch {
      console.log("Logout error.");
    }
  }


  return (
      <header className="header">
        <nav className="navbar">
          <div className="nav-logo">
            <a href="/" className="nav-logo">EMS</a>
          </div>
          <ul className={`nav-menu ${navbarOpen ? " active" : ""}`}>
            <li className="nav-item"  onClick={() => goTo("/")}>
              <FaHome />
              <p className="nav-link">Home</p>
            </li>
            <li className="nav-item"  onClick={() => goTo("/participant-list")}>
              <FaUserFriends />
              <p className="nav-link">Participants</p>
            </li>
              {
                !currentUser ? <>
                <li className="nav-item"  onClick={() => goTo("/login")}>
                <FaSignInAlt />
                <p className="nav-link">Login</p>
              </li>
              <li className="nav-item"  onClick={() => goTo("/register")}>
                <FaUserPlus />
                <p className="nav-link">Register</p>
              </li></> : 
              <>
              <li className="nav-item logout"  onClick={() => goTo("/logout")}>
                <FaSignOutAlt />
                <p className="nav-link">Log Out</p>
              </li> 
              </>
              } 
          </ul>
          <div className="hamburger" onClick={handleToggle}>
              <span className="bar" style={{transform: navbarOpen ? 'rotate(45deg) translateY(11px)' :'rotate(0) translateY(0)'}}></span>
              <span className="bar" style={{ opacity: navbarOpen ? '0' :'1'}}></span>
              <span className="bar" style={{transform: navbarOpen ? 'rotate(-45deg) translateY(-10px)' :'rotate(0) translateY(0)'}}></span>
          </div>
      </nav>
      </header>
        
    )
}
