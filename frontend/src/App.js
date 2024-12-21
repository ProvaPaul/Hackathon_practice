import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Chat from "./components/chat";
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/register" element={<Auth isLogin={false} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/upload" element={<ImageUploader />} />
      </Routes>
    </Router>
  );
}

export default App;
