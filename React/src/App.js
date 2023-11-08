import Home from "./pages/Home";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import UsersView from "./pages/UsersView";
import UserProfile from "./pages/UserProfile";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <div className="container mt-5">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/display-users" element={<UsersView />}></Route>
          <Route
            exact
            path="/user-profile/:id"
            element={<UserProfile />}
          ></Route>
          <Route exact path="/register-user" element={<RegisterUser />}></Route>
          <Route exact path="/update-user/:id" element={<UpdateUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
