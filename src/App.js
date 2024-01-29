import './App.css';
import "../src/assets/scss/default.scss"
import React from "react";
import {BrowserRouter} from 'react-router-dom';
import RouteConfig from "./navigation/RouteConfig";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <RouteConfig/>
        </BrowserRouter>
    </div>
  );
}

export default App;
