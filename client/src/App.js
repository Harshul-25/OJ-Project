import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problem from './Components/Problem';
import './App.css';
import Problemset from './Components/Problemset';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div id='root2'>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/problemset" element={<Problemset/>}/>
          <Route path="/problem/:id" element={<Problem/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
