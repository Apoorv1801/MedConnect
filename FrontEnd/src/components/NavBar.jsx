import { useState, useEffect, useRef } from "react";

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
        <a href="/">Home</a>
        <a href="/">Find Doctor</a>
        <a href="/">Hospitals</a>
        <a href="/">Tests</a>
        <a href="/">Online Consultation</a>
      </div>

      <button className="login-btn">Login</button>
    </nav>
  );
}

export default Navbar;