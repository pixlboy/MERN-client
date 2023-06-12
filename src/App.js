import React from "react";
import { Routes } from "react-router";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="p-5">
      <BrowserRouter>
        <div className="mb-5">
          <Link to="/">Counter</Link>
          <Link to="/home" className="ml-5">
            Snippets
          </Link>
        </div>

        <Routes>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
