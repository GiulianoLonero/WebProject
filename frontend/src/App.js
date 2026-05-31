import React from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import Home from "./Components/Home/Home";
import { ReactRoute } from "./Components/ReactRouter";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Components/Header/Header"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path ="/login" element={<LoginForm/>}></Route>
        <Route path ="/" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
