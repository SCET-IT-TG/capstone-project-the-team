import React, { useState , useEffect } from "react";
import { handleError } from "../utils";
import { useNavigate } from "react-router-dom";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() =>{
        setLoggedInUser(localStorage.getItem('loggedInUser')) ;
    } , [])
    
    const handleLogout = () => {   
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        navigate("/login"); // Redirect to login page 
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            console.log("loggedInUser", loggedInUser);
            <div><h1>{loggedInUser}</h1></div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default Home;