function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">YOUR HEALTH, OUR PRIORITY</p>

          <h1>
            Healthcare that
            <span> connects with you.</span>
          </h1>

          <p className="hero-description">
            Find doctors, book appointments, schedule medical tests,
            manage prescriptions and connect with healthcare professionals
            from anywhere.
          </p>

          <div className="hero-buttons">
            <button>Find a Doctor</button>
            <button>Book a Test</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">
            Medical Consultation
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;