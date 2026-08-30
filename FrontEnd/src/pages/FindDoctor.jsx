import { useNavigate } from "react-router-dom";
import SpecialtyCard from "../components/SpecialtyCard";
import specialties from "../data/specialitiesData";

function FindDoctor() {
    const navigate = useNavigate();

    const handleSpecialtyClick = (specialty) => {
        navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`);
    };

    return (
        <section className="find-doctor-page">

            {/* PAGE HEADING */}

            <div className="find-doctor-heading">

                <div className="section-label">
                    FIND THE RIGHT DOCTOR
                </div>

                <h1>
                    Healthcare starts with
                    <br />
                    <span>the right doctor.</span>
                </h1>

                <p>
                    Choose a speciality to find experienced doctors across
                    hospitals and book an appointment that works for you.
                </p>

            </div>


            {/* SPECIALITIES */}

            <div className="specialties-section">

                <div className="specialties-heading">
                    <h2>Explore by speciality</h2>

                    <p>
                        Select a speciality to discover doctors who can help you.
                    </p>
                </div>


                <div className="specialties-grid">

                    {specialties.map((specialty) => (

                        <SpecialtyCard
                            key={specialty.title}
                            title={specialty.title}
                            image={specialty.image}
                            description={specialty.description}
                            onClick={() =>
                                handleSpecialtyClick(specialty.title)
                            }
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

export default FindDoctor;