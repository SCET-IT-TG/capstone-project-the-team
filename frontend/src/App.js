import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [originalUrl , setOriginalUrl] = useState(""); 
  const [shortUrl , setShortUrl] = useState("");

  const handleSubmit = () =>{
    axios.post("http://localhost:3000/api/short", {originalUrl})
    .then((response) => {
      setShortUrl(response.data.shortUrl);
      console.log("response",response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
    console.log(originalUrl);
  }

  return(
    <div>
      <input value={originalUrl} 
      onChange={(e) => setOriginalUrl(e.target.value)} 
      required
      type="text"
      name="originalUrl"
      placeholder="Enter URL to shorten"
      />
    <br></br>
      <button
      onClick={handleSubmit}
      type="submit"
      >
    submit
    </button>
    {
      shortUrl && (
        <div>
          Short URL: 
          <a href={`http://localhost:3000/${shortUrl}`} target="_blank" rel="noopener noreferrer">
          {shortUrl}
          </a>
        </div>
      )
    }
    </div>
  )

}


export default App;
