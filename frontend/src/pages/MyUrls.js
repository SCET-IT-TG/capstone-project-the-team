import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './MyUrls.css'; // Add custom styles here
import Navbar from "./Navbar"; // Assuming the Navbar component is available
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { handleSuccess } from "../utils";

function MyUrls() {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (!email) {
      handleError("Please login to view your URLs.");
      navigate("/login");
    } else {
      fetchUserUrls(email);
    }
  }, [navigate]);

  const fetchUserUrls = async (email) => {
    try {
        const response = await fetch(`http://localhost:8080/urls/${email}`);
        const result = await response.json();

        // Log the full response to inspect its structure
        console.log("API Response:", result);

        if (response.ok) {
            // Check if the response is an array
            if (Array.isArray(result)) {
                // Remove duplicates based on 'shortUrl'
                const uniqueUrls = removeDuplicates(result);
                setUrls(uniqueUrls);
            } else {
                handleError("Error: Data is not in expected format.");
            }
        } else {
            handleError(result.message || "Failed to load URLs.");
        }
    } catch (err) {
        console.error("Error fetching URLs:", err);
        handleError("There was an error fetching your URLs.");
    }
};
const removeDuplicates = (urls) => {
  return urls.filter((url, index, self) =>
      index === self.findIndex((t) => (
          t.shortUrl === url.shortUrl  // Remove duplicates based on shortUrl
      ))
  );
};

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortUrl}`);
    alert('URL copied!');
  };

  return (
    <div>
      <Navbar />
      <div className="my-urls-container">
        <h2>Your Shortened URLs</h2>
        <ul className="urls-list">
          {urls.length > 0 ? (
            urls.map((url, index) => (
              <li key={index} className="url-item">
                <p>
                  <a href={`http://localhost:8080/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                    {`http://localhost:8080/${url.shortUrl}`}
                  </a>
                </p>
                <button onClick={() => handleCopy(url.shortUrl)} className="copy-btn">Copy</button>
              </li>
            ))
          ) : (
            <p>No URLs found.</p>
          )}
        </ul>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default MyUrls;
