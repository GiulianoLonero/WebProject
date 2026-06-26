import React from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm"
import Home from "./Components/Home/Home";
import { ProtRouter } from "./Components/ProtRouter";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header"
import {useAuth} from "./hooks/useAuth"
import EventCreatePage from "./Components/EventCreatePage/EventCreatePage";
import SavedEventsPage from "./Components/SavedEventsPage/SavedEventsPage";
import UserPage from "./Components/UserPage/UserPage";
import Footer from "./Components/Footer/Footer";


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
        <Route path ="/registration/:id" element={<RegisterForm/>}></Route>
        <Route path ="/registration/" element={<RegisterForm/>}></Route>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/user-profile/:id" element={<UserPage />}></Route>
        <Route path ="/events/saved-events" element={<SavedEventsPage/>}></Route>
        <Route path ="/editing-page" element={
          <ProtRouter>
            <EventCreatePage/> 
          </ProtRouter>}>
          </Route>
        <Route path = "/events/creation-event" element={
          <ProtRouter>
            <EventCreatePage/>
          </ProtRouter>}
          />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
