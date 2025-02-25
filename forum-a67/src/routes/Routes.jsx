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
import AdminPanel from "../views/AdminPanel/main/AdminPanel";

import ProfileDetails from "../components/profile/ProfileDetails/ProfileDetails";
import ProfilePosts from "../components/profile/ProfilePosts/ProfilePosts";
import ProfileComments from "../components/profile/ProfileComments/ProfileComments";
import RegistrationSuccess from "../components/informational/RegistrationSuccess/RegistrationSuccess";

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
        element={<Home />}
      ></Route>
      <Route
        path="/login"
        element={<Login />}
      ></Route>
      <Route
        path="/register"
        element={<Register />}
      ></Route>
      <Route
        path="/registration-success"
        element={<RegistrationSuccess />}
      ></Route>
      <Route
        path="/create-post"
        element={<CreatePost />}
      ></Route>
      <Route
        path="/profile/:username"
        element={<Profile />}
      >
        <Route
          index
          element={<ProfileDetails></ProfileDetails>}
        ></Route>
        <Route
          path="details"
          element={<ProfileDetails></ProfileDetails>}
        ></Route>
        <Route
          path="posts"
          element={<ProfilePosts></ProfilePosts>}
        ></Route>
        <Route
          path="comments"
          element={<ProfileComments></ProfileComments>}
        ></Route>
      </Route>
      <Route
        path="/post/:postId"
        element={<WholePostView />}
      ></Route>
      <Route
        path="/admin-panel"
        element={<AdminPanel />}
      ></Route>

      <Route
        path="*"
        element={<NotFound />}
      ></Route>
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
