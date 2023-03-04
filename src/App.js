import { Route, Routes } from "react-router-dom";
import Personal from "./components/Personal/Personal";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import CVResult from "./components/CV/CVResult";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const LandingPage = React.lazy(() =>
  import("./components/Landing/LandingPage")
);

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "424px",
            }}
          >
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/cv" element={<CVResult />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
