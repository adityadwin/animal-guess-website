import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundContext";
import Home from "./pages/Home";
import GuessGame from "./pages/GuessGame";
import Sing from "./pages/Sing";
import "./index.css";

function App() {
  return (
    <SoundProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guess" element={<GuessGame />} />
          <Route path="/sing" element={<Sing />} />
        </Routes>
      </Router>
    </SoundProvider>
  );
}

export default App;
