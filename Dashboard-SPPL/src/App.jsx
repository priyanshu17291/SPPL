import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SensorLayout from "./pages/SensorLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sensorLayout" element={<SensorLayout />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
