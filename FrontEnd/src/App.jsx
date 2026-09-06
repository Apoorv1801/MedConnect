import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import SpecialtiesSection from "./pages/SpecialtiesSection";
import TestCategoriesSection from "./pages/TestCategoriesSection";
import FindDoctor from "./pages/FindDoctor";
import DoctorBooking from "./pages/DoctorBooking";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import TestSearch from "./pages/TestSearch";
import TestCompare from "./pages/TestCompare";
import TestCart from "./pages/TestCart";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LabDirectory from "./pages/LabDirectory";
import LabProfile from "./pages/LabProfile";

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
        <Route path="/find-doctor/:id" element={<DoctorBooking />} />
        <Route path="/find-doctor/confirmation" element={<AppointmentConfirmation />} />
        <Route path="/tests" element={<TestSearch />} />
        <Route path="/tests/:id" element={<TestCompare />} />
        <Route path="/tests/cart" element={<TestCart />} />
        <Route path="/tests/confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/labs" element={<LabDirectory />} />
        <Route path="/labs/:id" element={<LabProfile />} />
      </Routes>
    </>
  );
}

export default App;