import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Components/Login/Login";
import Gmail from "./Components/Login/Gmail";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/gmail" element={<Gmail />} />
      </Routes>
    </div>
  );
}

export default App;
