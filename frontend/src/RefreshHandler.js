import React from "react";
import { useLocation , useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RefreshHandler({setIsAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('authToken')){
          setIsAuthenticated(true);
          if(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/"){
            navigate("/shortener", {replace : false});
          }
        }
    },[location , setIsAuthenticated , navigate]);

    return (
        null    
    );
}

export default RefreshHandler;