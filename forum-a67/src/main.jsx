//Misc imports
import "./index.css";

//Dependency imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

//View imports
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
);
