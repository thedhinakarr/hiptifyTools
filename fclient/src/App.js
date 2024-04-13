import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
import SOSDashboard from "./Components/ShowOnSale/SOSDashboard";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute.js";

function App() {
  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path="/sosDashboard" element={<SOSDashboard />} />
      </Route>

    </Routes>

  );
}

export default App;
