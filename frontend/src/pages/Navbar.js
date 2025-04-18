import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("loggedInEmail");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedInEmail");
        localStorage.removeItem("name");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/shortener" className="navbar-logo-link">
                    URL Shortener
                </Link>
            </div>
            <div className="navbar-links">
                {!email ? (
                    <>
                        <Link to="/login" className="nav-button">Login</Link>
                        <Link to="/signup" className="nav-button">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/myurls" className="nav-button">My URLs</Link>
                        <Link to="/shortener" className="nav-button">Shortener</Link>
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
