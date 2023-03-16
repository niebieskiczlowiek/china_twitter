import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
