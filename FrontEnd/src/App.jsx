import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Features from "./pages/Features";
import FindDoctor from "./pages/FindDoctor";
import Doctors from "./pages/Doctor";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
            </>
          }
        />

        <Route
          path="/find-doctor"
          element={<FindDoctor />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;