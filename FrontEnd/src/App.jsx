import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import SpecialtiesSection from "./pages/SpecialtiesSection";
import TestCategoriesSection from "./pages/TestCategoriesSection";
import FindDoctor from "./pages/FindDoctor";
import TestSearch from "./pages/TestSearch";
import TestCompare from "./pages/TestCompare";
import TestCart from "./pages/TestCart";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
        <Route path="/tests/:id" element={<TestCompare />} />
        <Route path="/tests/cart" element={<TestCart />} />
        <Route path="/tests/confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;