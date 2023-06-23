import React from "react";
import "./App.scss";
import { Routes } from "react-router";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./SnippetsManager/SnippetManager";
import Header from "./Header/Header";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
