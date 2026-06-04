import React from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import Home from "./Components/Home/Home";
import { ProtRoute } from "./Components/ProtRouter";
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
        <Route path ="/" element={<Home/>}></Route>
        <ProtRoute>
          <Route path = "/events/create" element={<EventCreatePage/>}/>
        </ProtRoute>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
