import { useState } from "react";
import "./App.css";
import "./styles/GameGridStyle.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          style={{ width: "auto" }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
