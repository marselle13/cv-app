import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Personal from "./components/Personal/Personal";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import CVResult from "./components/CV/CVResult";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/cv-app" element={<LandingPage />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/cv" element={<CVResult />} />
      </Routes>
    </div>
  );
}

export default App;
