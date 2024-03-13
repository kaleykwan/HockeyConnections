import { useState } from "react";
import "./App.css";
import "./styles/GameGridStyle.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import { ToastContainer } from "react-toastify";
import { inject } from '@vercel/analytics';
 
inject();

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
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
