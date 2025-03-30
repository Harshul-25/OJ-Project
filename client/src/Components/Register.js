import React from "react";
import { useState } from "react";
import { API_URL } from "./Api";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const Nav = useNavigate();
  const [data, setData] = useState({ name: "", mail: "", handle: "", pass: "", cpass: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!data.name || !data.mail || !data.handle || !data.pass || !data.cpass) {
        setError("Please fill in all fields.");
        return;
    }
    if (data.pass !== data.cpass) {
        setError("Passwords do not match.");
        return;
    }
     if (data.pass.length < 5) {
        setError("Password must be at least 5 characters long.");
        return;
    }

    try {
      const payload = { name: data.name, mail: data.mail, handle: data.handle, pass: data.pass };
      const result = await axios.post(`${API_URL}/signup`, payload);
      console.log("Registration Response:", result.data);

      setSuccess(result.data?.message || "Registration successful! Redirecting...");
      
      setData({ name: "", mail: "", handle: "", pass: "", cpass: "" });
      setTimeout(() => Nav("/"), 2000);

    } catch (error) {
      console.error("Registration Error:", error);
       let errorMsg = "An unexpected error occurred during registration.";
       if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
      } else if (error.request) {
          errorMsg = "No response received from server. Please check network.";
      } else {
          errorMsg = `Error setting up request: ${error.message}`;
      }
      setError(errorMsg);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Register</h1>
         {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}
         {success && <p style={{color: 'green', marginBottom: '1rem'}}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={data.name} onChange={handleChange} required/>
          <label htmlFor="mail">Email:</label>
          <input type="email" name="mail" id="mail" value={data.mail} onChange={handleChange} required/>
          <label htmlFor="handle">Handle:</label>
          <input type="text" name="handle" id="handle" value={data.handle} onChange={handleChange} required />
          <label htmlFor="pass">Password:</label>
          <input type="password" name="pass" id="pass" value={data.pass} onChange={handleChange} required />
          <label htmlFor="cpass">Confirm Password:</label>
          <input type="password" name="cpass" id="cpass" value={data.cpass} onChange={handleChange} required/>
          <button type="submit">Register</button>
        </form>
      </div>
       <Link to="/" className="switch-form-button">Already have an account? Login</Link>
    </div>
  );
}
