import "./App.css";
import "../src/assets/scss/default.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteConfig from "./navigation/RouteConfig";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <RouteConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
