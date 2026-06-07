import React from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm"
import Home from "./Components/Home/Home";
import { ProtRouter } from "./Components/ProtRouter";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header"
import {useAuth} from "./hooks/useAuth"
import EventCreatePage from "./Components/EventCreatePage/EventCreatePage";


function App() {
  const {isLoading} = useAuth();
  if (isLoading) {
        return <div>Caricamento in corso...</div>; 
    }
    
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path ="/login" element={<LoginForm/>}></Route>
        <Route path ="/registration" element={<RegisterForm/>}></Route>
        <Route path ="/" element={<Home/>}></Route>
        <Route path = "/events/creation-event" element={
          <ProtRouter>
            <EventCreatePage/>
          </ProtRouter>}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
