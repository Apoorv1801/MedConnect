import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import SpecialtiesSection from "./pages/SpecialtiesSection";
import TestCategoriesSection from "./pages/TestCategoriesSection";
import FindDoctor from "./pages/FindDoctor";
import TestSearch from "./pages/TestSearch";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              <SpecialtiesSection />
              <TestCategoriesSection />
            </>
          }
        />

        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/tests" element={<TestSearch />} />
      </Routes>
    </>
  );
}

export default App;