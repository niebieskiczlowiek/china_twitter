import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Check, Profile, Verify, Post, Hashtag} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Check" element={<Check />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="/confirm/:token" element={<Verify />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="check" element={<Check />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="post/:id" element={<Post />} /> */}
          <Route path="post/:id" element={<Post />} />
          <Route path="/:tag" element={<Hashtag />} />

          {/* <Route path="confirm/:token/:id" element={<Confirm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;