import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { CVContextProvider } from "./components/Store/cvContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <CVContextProvider>
      <App />
    </CVContextProvider>
  </HashRouter>
);
