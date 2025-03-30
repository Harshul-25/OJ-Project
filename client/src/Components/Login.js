import React from "react";
import { useState } from "react";
import { API_URL } from "./Api";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const Nav = useNavigate();
  const [data, setData] = useState({ mail: "", pass: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.mail || !data.pass) {
        setError("Please enter both email and password.");
        return;
    }

    try {
      const result = await axios.post(`${API_URL}/login`, data);
      const token = result.data.token;
      const mail = result.data.mail;
      const handle = result.data.handle;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("mail", mail);
      sessionStorage.setItem('handle',handle)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Nav("/problemset");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred during login.");
      }
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
          <h1>Login</h1>
           {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="mail">Email:</label>
            <input
              type="email"
              name="mail"
              id="mail"
              value={data.mail}
              onChange={handleChange}
              required
            />
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              name="pass"
              id="pass"
              value={data.pass}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
      </div>
      <Link to="/register" className="switch-form-button">Don't have an account? Register</Link>
    </div>
  );
}
