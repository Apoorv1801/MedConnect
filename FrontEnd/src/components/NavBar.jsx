import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);   // scrolling down -> hide
      } else {
        setHidden(false);  // scrolling up -> show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
      <div className="logo">
        Med<span>Connect</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/find-doctor">Find Doctor</Link>
        <a href="#">Hospitals</a>
        <Link to="/tests">Tests</Link>
        <a href="#">Online Consultation</a>
      </div>

      <button className="login-btn">Login</button>
    </nav>
  );
}

export default Navbar;