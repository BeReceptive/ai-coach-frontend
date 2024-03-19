import "./App.css";
import "../src/assets/scss/default.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";
import RouteConfig from "./navigation/RouteConfig";

function App() {
  ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
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
