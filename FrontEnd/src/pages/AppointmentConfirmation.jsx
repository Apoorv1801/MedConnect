import { useLocation, useNavigate, Navigate } from "react-router-dom";

function AppointmentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    // If someone lands here directly (e.g. page refresh), there's no
    // booking in memory — send them back to find a doctor instead.
    if (!booking) {
        return <Navigate to="/find-doctor" replace />;
    }

    return (
        <section className="booking-confirmation-page">
            <div className="confirmation-card">
                <div className="confirmation-icon">✅</div>
                <h1>Appointment Confirmed!</h1>
                <p className="confirmation-id">Booking ID: {booking.id}</p>

                <div className="confirmation-details">
                    <div className="confirmation-row">
                        <span>Patient</span>
                        <span>
                            {booking.patientName} ({booking.patientAge}, {booking.patientGender})
                        </span>
                    </div>
                    <div className="confirmation-row">
                        <span>Doctor</span>
                        <span>{booking.doctorName}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Specialty</span>
                        <span>{booking.specialty}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Hospital</span>
                        <span>{booking.hospitalName}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Mode</span>
                        <span>
                            {booking.mode === "video" ? "Video Consultation" : "In-Person Visit"}
                        </span>
                    </div>
                    <div className="confirmation-row">
                        <span>Date</span>
                        <span>{booking.date}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Time Slot</span>
                        <span>{booking.slot}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Phone</span>
                        <span>{booking.phone}</span>
                    </div>
                </div>

                <div className="confirmation-total-row">
                    <span>Consultation Fee</span>
                    <span>₹{booking.fee}</span>
                </div>

                <button className="show-more-btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </section>
    );
}

export default AppointmentConfirmation;
