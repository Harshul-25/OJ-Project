import React from "react";
import { API_URL } from "./Api";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const Nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${API_URL}/login`, { mail, pass }).then((res) => {
        if (res.data.status === "failed") {
          alert("Please enter valid email or password");
        } else if (res.data.status === "success") {
          sessionStorage.setItem('token',res.data.token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
          // sessionStorage.setItem('mail',res.data.check.email)
          sessionStorage.setItem('handle',res.data.handle)
          Nav("/problemset");
        }
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2 style={{ padding: "1rem" }}>Login</h2>
        <label htmlFor="email">email</label>
        <input
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          type="email"
          id="email"
          required
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button>
        <Link to="/register">Don't have a account register here</Link>
      </button>
    </div>
  );
}
