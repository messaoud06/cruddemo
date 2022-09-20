import React from 'react';
import { Login,Home, LoginNew } from "./components";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

function App() {

  return (
    <Router >
        <Routes>
          <Route path="/" element={<LoginNew/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>  
    </Router>
  );
}

export default App;
