import React from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Problem from "./Components/Problem";
import "./App.css";
import Problemset from "./Components/Problemset";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Protected from "./Components/Protected";
import IDE from "./Components/Ide";
import Submissions from "./Components/Submissions";

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const logIn = () => {
  //   setisLoggedIn(true);
  // };
  // const logOut = () => {
  //   setisLoggedIn(false);
  // };

  (function() {
    const token = sessionStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
    }
  })();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/problemset"
            element={
              <Protected>
                <Problemset />
              </Protected>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <Protected>
                <Problem />
              </Protected>
            }
          />
          <Route
            path="/ide"
            element={
              <Protected>
                <IDE />
              </Protected>
            }
          />
          <Route
            path="/submissions"
            element={
              <Protected>
                <Submissions />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
