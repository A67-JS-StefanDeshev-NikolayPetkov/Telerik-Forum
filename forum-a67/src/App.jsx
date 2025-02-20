//Misc imports
import "./App.css";
import NavigationRoutes from "./routes/Routes";

//Dependency imports
import { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";

//Component imports
import Header from "./components/Header/Header";
import Loader from "./components/loader/loader";

function App() {
  const [count, setCount] = useState(0);
  const { loading } = useContext(AppContext);

  return loading ? (
    <Loader></Loader>
  ) : (
    <>
      <Header></Header>
      <NavigationRoutes></NavigationRoutes>
    </>
  );
}

export default App;
