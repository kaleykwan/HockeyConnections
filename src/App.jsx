import { useState } from "react";
import "./App.css";
import "./styles/GameGridStyle.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:gameID" element={<GamePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
