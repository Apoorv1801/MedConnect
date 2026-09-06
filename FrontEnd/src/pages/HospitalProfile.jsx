import { useParams, useNavigate } from "react-router-dom";
import hospitalsData from "../data/hospitalsData";
import doctorsData from "../data/doctorsData";
import labsData from "../data/labsData";

function HospitalProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const hospital = hospitalsData.find((h) => h.id === Number(id));

    if (!hospital) {
        return (
            <section className="hospital-profile-page">
                <button className="back-btn" onClick={() => navigate("/hospitals")}>
                    ← Back to Hospitals
                </button>
                <p className="no-results">Hospital not found.</p>
            </section>
        );
    }

    const doctors = doctorsData.filter((d) => d.hospitalId === hospital.id);
    const lab = labsData.find((l) => l.hospitalId === hospital.id);

    return (
        <section className="hospital-profile-page">
            <button className="back-btn" onClick={() => navigate("/hospitals")}>
                ← Back to Hospitals
            </button>

            <div className="hospital-profile-heading">
                <div className="section-label">{hospital.type.toUpperCase()}</div>
                <h1>{hospital.name}</h1>
                <p>
                    ⭐ {hospital.rating} rating • {hospital.address}
                </p>
            </div>

            <div className="hospital-emergency-banner">
                <span>🚨 Emergency Contact</span>
                <a href={`tel:${hospital.emergencyContact}`}>
                    {hospital.emergencyContact}
                </a>
            </div>

            <div className="hospital-facilities">
                {hospital.facilities.map((f) => (
                    <span className="hospital-facility-tag" key={f}>
                        {f}
                    </span>
                ))}
            </div>

            <div className="hospital-section">
                <h2>Doctors at this hospital</h2>

                {doctors.length === 0 ? (
                    <p className="no-results">
                        No doctors listed for this hospital yet.
                    </p>
                ) : (
                    <div className="doctor-grid">
                        {doctors.map((doc) => (
                            <div className="doctor-card" key={doc.id}>
                                <div className="doctor-card-image">
                                    <img src={doc.image} alt={doc.name} />
                                </div>

                                <div className="doctor-card-content">
                                    <h3>{doc.name}</h3>
                                    <p className="doctor-specialty">{doc.specialty}</p>

                                    <div className="doctor-meta">
                                        <span>{doc.experience} yrs exp</span>
                                        <span>•</span>
                                        <span>{doc.location}</span>
                                    </div>

                                    <div className="doctor-footer">
                                        <span className="doctor-rating">⭐ {doc.rating}</span>
                                        <span className="doctor-fee">₹{doc.fee}</span>
                                    </div>

                                    <button
                                        className="book-btn"
                                        onClick={() => navigate(`/find-doctor/${doc.id}`)}
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="hospital-section">
                <h2>Tests available here</h2>

                {lab ? (
                    <div className="hospital-lab-card">
                        <div>
                            <h3>{lab.name}</h3>
                            <p className="lab-directory-meta">
                                ⭐ {lab.rating} • {lab.city}
                            </p>
                        </div>
                        <button
                            className="show-more-btn"
                            onClick={() => navigate(`/labs/${lab.id}`)}
                        >
                            View All Tests
                        </button>
                    </div>
                ) : (
                    <p className="no-results">
                        This hospital doesn't have an in-house diagnostics lab listed
                        yet.{" "}
                        <span
                            className="dashboard-link"
                            onClick={() => navigate("/labs")}
                        >
                            Browse all labs
                        </span>
                    </p>
                )}
            </div>
        </section>
    );
}

export default HospitalProfile;