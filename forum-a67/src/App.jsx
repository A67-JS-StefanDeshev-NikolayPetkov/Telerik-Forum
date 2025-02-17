//Misc imports
import "./App.css";
import NavigationRoutes from "./routes/Routes";

//Dependency imports
import { useState } from "react";

//Component imports
import Header from "./components/Header/Header";

//View imports
import Home from "./views/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavigationRoutes></NavigationRoutes>
      <Header></Header>
    </>
  );
}

export default App;
