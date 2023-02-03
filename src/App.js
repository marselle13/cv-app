import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Personal from "./components/Personal/Personal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/personal" element={<Personal />}></Route>
    </Routes>
  );
}

export default App;
