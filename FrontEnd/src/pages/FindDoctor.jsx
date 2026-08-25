import { useState, useMemo } from "react";
import doctorsData from "../data/doctorsData";


function FindDoctor() {
  const [searchText, setSearchText] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const specialties = useMemo(
    () => [...new Set(doctorsData.map((doc) => doc.specialty))],
    []
  );
  const locations = useMemo(
    () => [...new Set(doctorsData.map((doc) => doc.location))],
    []
  );

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesSpecialty = specialty ? doc.specialty === specialty : true;
      const matchesLocation = location ? doc.location === location : true;

      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [searchText, specialty, location]);

  return (
    <section className="find-doctor-page">
      <div className="find-doctor-heading">
        <div className="section-label">FIND THE RIGHT DOCTOR</div>

        <h1>
          Healthcare starts with
          <br />
          <span>the right doctor.</span>
        </h1>

        <p>
          Find experienced doctors across specialties and hospitals, and book
          an appointment that works for you.
        </p>
      </div>

    

      {/* RESULTS */}
      <div className="doctor-results-count">
        {filteredDoctors.length} doctor{filteredDoctors.length !== 1 && "s"}{" "}
        found
      </div>

      <div className="doctor-grid">
        {filteredDoctors.length === 0 ? (
          <p className="no-results">No doctors match your search.</p>
        ) : (
          filteredDoctors.map((doc) => (
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

                <button className="book-btn">Book Appointment</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default FindDoctor;