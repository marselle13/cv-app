import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CVContextProvider } from "./components/Store/cvContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <CVContextProvider>
      <App />
    </CVContextProvider>
  </BrowserRouter>
);
