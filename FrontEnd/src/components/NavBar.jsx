import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { cart } = useCart();
  const { currentUser, logout } = useAuth();

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
        <Link to="/hospitals">Hospitals</Link>
        <Link to="/tests">Tests</Link>
        <Link to="/online-consultation">Online Consultation</Link>
      </div>

      <div className="navbar-actions">
        <Link to="/tests/cart" className="cart-icon-wrap">
          <ShoppingCart size={22} />
          {cart.items.length > 0 && (
            <span className="cart-badge">{cart.items.length}</span>
          )}
        </Link>

        {currentUser ? (
          <div className="user-menu">
            <Link to="/dashboard" className="dashboard-btn">
              <User size={16} />
              {currentUser.name.split(" ")[0]}
            </Link>
            <button className="login-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;