import React from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import Home from "./Components/Home/Home";
import { ReactRoute } from "./Components/ReactRouter";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<LoginForm/>}></Route>
        <Route path = "/" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
