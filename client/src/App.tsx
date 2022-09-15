import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import Auth from "./features/authentication/auth/Auth";
import CheckedIn from "./pages/CheckedIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./sass/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkedin" element={<CheckedIn />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
