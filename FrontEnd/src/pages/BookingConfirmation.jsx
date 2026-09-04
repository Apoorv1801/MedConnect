import { useLocation, useNavigate, Navigate } from "react-router-dom";

function BookingConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    // If someone lands here directly (e.g. page refresh), there's no
    // booking in memory — send them back to browse tests instead.
    if (!booking) {
        return <Navigate to="/tests" replace />;
    }

    return (
        <section className="booking-confirmation-page">
            <div className="confirmation-card">
                <div className="confirmation-icon">✅</div>
                <h1>Booking Confirmed!</h1>
                <p className="confirmation-id">Booking ID: {booking.id}</p>

                <div className="confirmation-details">
                    <div className="confirmation-row">
                        <span>Patient</span>
                        <span>
                            {booking.patientName} ({booking.patientAge}, {booking.patientGender})
                        </span>
                    </div>
                    <div className="confirmation-row">
                        <span>Lab</span>
                        <span>{booking.labName}</span>
                    </div>
                    <div className="confirmation-row">
                        <span>Mode</span>
                        <span>
                            {booking.mode === "home" ? "Home Collection" : "Lab Visit"}
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
                    {booking.mode === "home" && (
                        <div className="confirmation-row">
                            <span>Address</span>
                            <span>{booking.address}</span>
                        </div>
                    )}
                </div>

                <div className="confirmation-tests">
                    <h3>Tests Booked</h3>
                    {booking.items.map((item) => (
                        <div className="confirmation-test-row" key={item.testId}>
                            <span>{item.testName}</span>
                            <span>₹{item.price}</span>
                        </div>
                    ))}
                </div>

                <div className="confirmation-total-row">
                    <span>Total Paid</span>
                    <span>₹{booking.total}</span>
                </div>

                <button className="show-more-btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </section>
    );
}

export default BookingConfirmation;