import { useNavigate } from "react-router-dom";
import DepartmentsGrid from "../components/DepartmentsGrid";

function SpecialtiesSection() {
    const navigate = useNavigate();

    const handleSelect = (specialty) => {
        navigate("/find-doctor", { state: { specialty } });
    };

    return (
        <section className="specialties-home-section">
            <DepartmentsGrid onSelect={handleSelect} activeSpecialty="" />

            <div className="show-more-wrap">
                <button
                    className="show-more-btn"
                    onClick={() => navigate("/find-doctor")}
                >
                    Show More
                </button>
            </div>
        </section>
    );
}

export default SpecialtiesSection;