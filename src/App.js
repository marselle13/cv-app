import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Personal from "./components/Personal/Personal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal" element={<Personal />} />
      </Routes>
    </div>
  );
}

export default App;
