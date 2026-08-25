function FindDoctor() {
    return (
        <section className="find-doctor-page">

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
                    Find experienced doctors across specialties and hospitals,
                    and book an appointment that works for you.
                </p>
            </div>

            <div className="doctor-search">

                <input
                    type="text"
                    placeholder="Search by doctor, specialty..."
                />

                <select>
                    <option value="">Select Specialty</option>
                    <option>General Physician</option>
                    <option>Cardiologist</option>
                    <option>Dermatologist</option>
                    <option>Neurologist</option>
                    <option>Pediatrician</option>
                </select>

                <select>
                    <option value="">Select Location</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                </select>

                <button>
                    Search Doctors
                </button>

            </div>

        </section>
    );
}

export default FindDoctor;