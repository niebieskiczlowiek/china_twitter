import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Check } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Check" element={<Check />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;