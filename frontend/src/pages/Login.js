import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Navbar from "./Navbar"; // Import Navbar
import "./Login.css";

function Login() {
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        if (!email || !password) {
            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            const { success, message, jwtToken, name } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem("authToken", jwtToken);
                localStorage.setItem("loggedInEmail", email);
                localStorage.setItem("name", name);
                navigate("/shortener");
            } else {
                handleError(message || "Login failed");
            }
        } catch (err) {
            handleError(err.message || "An error occurred during login");
        }
    };

    return (
        <div className="container">
            <Navbar /> {/* Add Navbar */}
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
