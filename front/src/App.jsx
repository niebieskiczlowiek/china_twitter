import "./App.css";
import React from "react";
import { BrowserRouter, Path, Routes, Route } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Login, Register, Home, Check, Profile, Verify, Post, Hashtag} from "./pages"

function App() {
  const supportsHistory = 'pushState' in window.history;

  return (
    <div className="App">
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Routes>

        // check connection || test endpoint
        <Route path="Check" element={<Check />} />
          
          // login and register
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />


          
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