function Navbar() {
  return (
    <nav className="navbar">
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

      <button className="login-btn">
        Login
      </button>
    </nav>
  );
}

export default Navbar;