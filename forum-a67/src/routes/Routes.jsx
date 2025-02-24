//Dependency imports
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Component imports

//View imports
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import CreatePost from "../views/CreatePost/CreatePost";
import Profile from "../views/Profile/Profile";
import WholePostView from "../views/WholePostView/WholePostView";
import NotFound from "../views/NotFound/NotFound";
function NavigationRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to="/home"></Navigate>}
      ></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/create-post" element={<CreatePost />}></Route>
      <Route path="/profile/:page" element={<Profile />}></Route>
      <Route path="/post/:postId" element={<WholePostView />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      {/*<Route
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
