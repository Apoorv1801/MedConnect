function Features() {
    return (
        <section className="features-section">

            <div className="features-heading">

                <div className="section-label">
                    WHAT MEDCONNECT OFFERS
                </div>

                <h2>
                    Everything you need for
                    <br />
                    <span>better healthcare.</span>
                </h2>

                <p className="section-description">
                    From finding the right doctor to managing your medical records,
                    MedConnect brings your healthcare journey together in one place.
                </p>

            </div>


            <div className="features-grid">

                {/* FIND DOCTOR */}
                <div className="feature-card">

                    <div className="feature-image">
                        <img src="/images/find-doctor.png" alt="Find a Doctor" />
                    </div>

                    <div className="feature-content">
                        <h3>Find a Doctor</h3>

                        <p>
                            Find doctors across hospitals and book appointments based on
                            specialty, availability and location.
                        </p>
                    </div>

                </div>


                {/* BOOK TEST */}
                <div className="feature-card">

                    <div className="feature-image">
                        <img src="/images/book-test.png" alt="Book a Test" />
                    </div>

                    <div className="feature-content">
                        <h3>Book a Test</h3>

                        <p>
                            Schedule medical tests at hospitals and diagnostic centres
                            and access your reports digitally.
                        </p>
                    </div>

                </div>


                {/* PRESCRIPTIONS */}
                <div className="feature-card">

                    <div className="feature-image">
                        <img src="/images/prescriptions.png" alt="Prescriptions" />
                    </div>

                    <div className="feature-content">
                        <h3>Prescriptions</h3>

                        <p>
                            Keep your prescriptions organized and track your medicines
                            and treatment history in one place.
                        </p>
                    </div>

                </div>


                {/* ONLINE CONSULTATION */}
                <div className="feature-card">

                    <div className="feature-image">
                        <img src="/images/online-consultation.png" alt="Online Consultation" />
                    </div>

                    <div className="feature-content">
                        <h3>Online Consultation</h3>

                        <p>
                            Schedule secure online consultations with healthcare
                            professionals from the comfort of your home.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Features;