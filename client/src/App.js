import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problem from "./Components/Problem";
import "./App.css";
import Problemset from "./Components/Problemset";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Protected from "./Components/Protected";
import IDE from "./Components/Ide";
import Submissions from "./Components/Submissions";


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login loginFunction={logIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/problemset"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Problemset loginFunction={logOut} />
              </Protected>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Problem loginFunction={logOut} />
              </Protected>
            }
          />
          <Route
            path="/ide"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <IDE loginFunction={logOut} />
              </Protected>
            }
          />
          <Route path="/submissions" element={<Submissions/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
