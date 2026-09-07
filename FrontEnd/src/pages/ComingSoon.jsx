import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";

function ComingSoon() {
    const navigate = useNavigate();

    return (
        <section className="coming-soon-page">
            <div className="coming-soon-content">
                <div className="coming-soon-icon">
                    <Video size={36} />
                </div>
                <span className="coming-soon-badge">Coming Soon</span>
                <h1>Online Consultation</h1>
                <p>
                    Video consultations with your doctor will soon be available — check back soon.
                </p>
                <button className="show-more-btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </section>
    );
}

export default ComingSoon;