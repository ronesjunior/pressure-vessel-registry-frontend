import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/fonts/fonts.css";
import App from "./components/App/App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
