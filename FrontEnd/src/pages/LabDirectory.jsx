import { useNavigate } from "react-router-dom";
import labsData from "../data/labsData";
import labTestOfferings from "../data/labTestOfferings";

function LabDirectory() {
    const navigate = useNavigate();

    return (
        <section className="lab-directory-page">
            <button className="back-btn" onClick={() => navigate("/tests")}>
                ← Back to Tests
            </button>

            <div className="test-search-heading">
                <div className="section-label">DIAGNOSTIC LABS</div>
                <h1>
                    Browse tests by
                    <br />
                    <span>lab or hospital.</span>
                </h1>
                <p>
                    Want to get everything done in one visit? Pick a lab to see every
                    test they offer and add several to your cart at once.
                </p>
            </div>

            <div className="lab-directory-grid">
                {labsData.map((lab) => {
                    const offeringCount = labTestOfferings.filter(
                        (o) => o.labId === lab.id
                    ).length;

                    return (
                        <div
                            className="lab-directory-card"
                            key={lab.id}
                            onClick={() => navigate(`/labs/${lab.id}`)}
                        >
                            <h3>{lab.name}</h3>
                            <p className="lab-directory-meta">
                                ⭐ {lab.rating} • {lab.city}
                            </p>
                            <p className="lab-directory-count">
                                {offeringCount} test{offeringCount !== 1 && "s"} available
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default LabDirectory;