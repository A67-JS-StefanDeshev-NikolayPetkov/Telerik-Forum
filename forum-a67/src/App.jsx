//Misc imports
import "./App.css";
import NavigationRoutes from "./routes/Routes";

//Dependency imports
import { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";

//Component imports
import Header from "./components/Header/Header";
import Loader from "./components/loader/Loader";

function App() {
  const [count, setCount] = useState(0);
  const { user, userData, loading } = useContext(AppContext);

  return loading || (user && !userData) ? (
    <Loader></Loader>
  ) : (
    <>
      <Header></Header>
      <NavigationRoutes></NavigationRoutes>
    </>
  );
}

export default App;
