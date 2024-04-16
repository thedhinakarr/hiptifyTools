import LandingPage from "./Components/LandingPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute.js";
import Dashboard from "./Components/Dashboard";


function App() {
  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>

  );
}

export default App;
