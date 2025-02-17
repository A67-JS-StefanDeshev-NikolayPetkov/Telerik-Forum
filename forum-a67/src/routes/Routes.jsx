//Dependency imports
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Component imports

//View imports
import Home from "../views/Home/Home";

function NavigationRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            replace
            to="/home"
          ></Navigate>
        }
      ></Route>
      <Route
        path="/home"
        element={Home}
      ></Route>
      {/* <Route
        path="/login"
        element={Login}
      ></Route>
      <Route
        path="/register"
        element={Login}
      ></Route>
      <Route
        path="/posts"
        element={Login}
      ></Route>
      <Route
        path="/users"
        element={Login}
      ></Route>
      <Route
        path="/submit"
        element={Login}
      ></Route>
      <Route
        path="/about"
        element={Login}
      ></Route> */}
    </Routes>
  );
}

export default NavigationRoutes;
