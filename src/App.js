import React from "react";
import "./App.scss";
import { Routes } from "react-router";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
