import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Check, Profile } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Check" element={<Check />} />
          <Route path="Profile" element={<Profile />} />
          {/* <Route path="confirm/:token/:id" element={<Confirm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;