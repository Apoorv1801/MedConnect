import { useNavigate } from "react-router-dom";
import hospitalsData from "../data/hospitalsData";

function HospitalDirectory() {
    const navigate = useNavigate();

    return (
        <section className="hospital-directory-page">
            <button className="back-btn" onClick={() => navigate("/")}>
                ← Back to Home
            </button>

            <div className="test-search-heading">
                <div className="section-label">HOSPITALS</div>
                <h1>
                    Find hospitals
                    <br />
                    <span>near you.</span>
                </h1>
                <p>
                    Browse hospitals, see the doctors who practice there, and check
                    whether they run their own diagnostic lab.
                </p>
            </div>

            <div className="hospital-directory-grid">
                {hospitalsData.map((hospital) => (
                    <button
                        type="button"
                        className="hospital-directory-card"
                        key={hospital.id}
                        onClick={() => navigate(`/hospitals/${hospital.id}`)}
                    >
                        <h3>{hospital.name}</h3>
                        <p className="hospital-directory-type">{hospital.type}</p>
                        <p className="hospital-directory-meta">
                            ⭐ {hospital.rating} • {hospital.city}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default HospitalDirectory;