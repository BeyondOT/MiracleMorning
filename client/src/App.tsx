import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Navbar from "./components/navbar/Navbar";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import Auth from "./features/authentication/auth/Auth";
import { getToken, selectAuth } from "./features/authentication/authSlice";
import CheckedIn from "./pages/CheckedIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./sass/main.scss";


function App() {
  const { token, loading } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch()

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkedin" element={<CheckedIn />} />
          </Route>
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
