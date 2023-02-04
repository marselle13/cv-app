import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Personal from "./components/Personal/Personal";
import Experience from "./components/Experience/Experience";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </div>
  );
}

export default App;
