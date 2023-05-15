import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route, useParams } from "react-router-dom";
import { Login, Register, Home, Check, Profile, Post } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="check" element={<Check />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="post/:id" element={<Post />} /> */}
          <Route path="post/:id" element={<Post />} />

          {/* <Route path="confirm/:token/:id" element={<Confirm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;