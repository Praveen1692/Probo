import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Components/Login/Login";
import Gmail from "./Components/Login/Gmail";
import { Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';  

import UserRegistrationForm from "./Pages/UserRegistrationForm";

function App() {
  return (
    <div>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/gmail" element={<Gmail />} />
        


        {/* User Registration Form  */}
        <Route path="/register" element={<UserRegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
