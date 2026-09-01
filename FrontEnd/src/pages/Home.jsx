import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/find-doctor")}>
              Find a Doctor
            </button>
            <button onClick={() => navigate("/tests")}>Book a Test</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero-medical.png"
            alt="Doctor consulting a patient"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;