import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div>
                <h1>Home</h1>
                <p> (go to /login or /register) </p>
              </div>
            }
          />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
