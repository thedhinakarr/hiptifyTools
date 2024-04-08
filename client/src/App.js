import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
import SOSDashboard from "./Components/ShowOnSale/SOSDashboard";
import Login from "./Components/Login";

function App() {
  return (
    <div>
      <LandingPage />
      <Login />
      <Dashboard />
      <SOSDashboard />
    </div>
  );
}

export default App;
