import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = () => {
    setError('');
    setShortUrl('');
    setCopySuccess('');

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL.');
      return;
    }

    axios.post("http://localhost:3000/api/short", { originalUrl })
      .then((response) => {
        setShortUrl(response.data.shortUrl);
      })
      .catch(() => {
        setError("There was an error shortening the URL.");
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">URL Shortener</div>
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
                href={`http://localhost:3000/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:3000/{shortUrl}
              </a>
              <button onClick={handleCopy} className="copy-button">Copy</button>
              {copySuccess && <p className="copy-success">{copySuccess}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
