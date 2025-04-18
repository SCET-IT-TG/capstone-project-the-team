import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Navbar from "./Navbar"; // Import Navbar
import "./Login.css";

function Signup() {
    const [loginData, setLoginData] = React.useState({
        name: '',
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

    const handlesignUp = async (e) => {
        e.preventDefault();
        const { name, email, password } = loginData;

        if (!name || !email || !password) {
            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || "An error occurred during signup");
        }
    };

    return (
        <div className="container">
            <Navbar /> {/* Add Navbar */}
            <h1>Signup</h1>
            <form onSubmit={handlesignUp}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="name"
                        name="name"
                        value={loginData.name}
                    />
                </div>
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
                <button type="submit">Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
