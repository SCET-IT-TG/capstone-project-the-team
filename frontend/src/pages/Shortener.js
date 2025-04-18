import React, { useState } from 'react';
import { handleError } from "../utils";
import { useNavigate } from "react-router-dom";
import './Shortener.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Shortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const email = localStorage.getItem("loggedInEmail");  // Check if the user is logged in

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log("originalUrl", originalUrl);
    console.log("submit shorten url");
    setError('');
    setShortUrl('');
    setCopySuccess('');
    if (!email) {
      handleError("Please login to shorten the URL.");
      navigate("/login"); // Redirect to login if not logged in
      return;
    }
    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL.');
      return;
    }
   
    try {
      const response = await axios.post("http://localhost:8080/shorten", {
        originalUrl,
        email
      });
      console.log("response", response);
      if (response.data?.shortUrl) {
        setShortUrl(response.data.shortUrl);
      } else {
        setError("Shortening failed. Try again.");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("There was an error shortening the URL.");
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortUrl}`);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");  // Clear login data
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    handleSuccess("Logged out successfully.");
    navigate("/login"); // Redirect to login
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">URL Shortener</div>

        <div className="navbar-links">
          {/* Login Button */}
          {!email && (
            <>
              <button onClick={() => navigate("/login")} className="nav-button">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="nav-button">
                Sign Up
              </button>
            </>
          )}
          
          {/* My URLs Button - Only show if user is logged in */}
          {email && (
            <button onClick={() => navigate("/myurls")} className="nav-button">
              My URLs
            </button>
          )}
        </div>
      </nav>

      <div className="app-container">
        <div className="card">
          <h1 className="title">Shorten Your URL</h1>

          <input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            type="text"
            name="originalUrl"
            placeholder="Enter URL to shorten"
            className="input"
          />

          {error && <p className="error">{error}</p>}

          <button
            onClick={handleSubmit}
            type="submit"
            className="button"
          >
            Shorten
          </button>

          {shortUrl && (
            <div className="result">
              <p>Short URL:</p>
              <a
                href={`http://localhost:8080/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:8080/{shortUrl}
              </a>
              <button onClick={handleCopy} className="copy-button">Copy</button>
              {copySuccess && <p className="copy-success">{copySuccess}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Footer with Logout Button (only visible if logged in) */}
      {email && (
        <footer className="footer">
          <button onClick={handleLogout} className="footer-button">
            Logout
          </button>
        </footer>
      )}

      <ToastContainer />
    </div>
  );
}

export default Shortener;
