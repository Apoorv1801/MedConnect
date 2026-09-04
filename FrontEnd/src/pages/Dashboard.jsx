import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    getBookingsForUser,
    updateBookingStatus,
    rescheduleBooking,
} from "../utils/bookingsStore";
import {
    SLOT_CAPACITY,
    getSlotCount,
    isSlotFull,
    bookSlot,
    unbookSlot,
} from "../utils/slotAvailability";
import {
    CANCEL_CUTOFF_HOURS,
    RESCHEDULE_CUTOFF_HOURS,
    getBookingDisplayStatus,
    canCancelBooking,
    canRescheduleBooking,
} from "../utils/bookingPolicy";
import timeSlots from "../data/timeSlots";

function getDateBounds() {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxDateObj = new Date(today);
    maxDateObj.setDate(today.getDate() + 30);

    return {
        min: tomorrow.toISOString().split("T")[0],
        max: maxDateObj.toISOString().split("T")[0],
    };
}

function RescheduleForm({ booking, onCancel, onDone }) {
    const { min: minDate, max: maxDate } = getDateBounds();

    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");
    const [slotCounts, setSlotCounts] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!date) {
            setSlotCounts({});
            return;
        }

        const counts = {};
        timeSlots.forEach((s) => {
            counts[s] = getSlotCount(booking.labId, date, s);
        });
        setSlotCounts(counts);
        setSlot("");
    }, [date, booking.labId]);

    const handleConfirm = () => {
        if (!date || !slot) {
            setError("Please select both a date and a time slot.");
            return;
        }

        // Re-check right before committing, in case it filled up while
        // this form was open.
        if (isSlotFull(booking.labId, date, slot)) {
            setError("This slot just got fully booked. Please pick another.");
            return;
        }

        unbookSlot(booking.labId, booking.date, booking.slot);
        bookSlot(booking.labId, date, slot);
        rescheduleBooking(booking.id, date, slot);

        onDone();
    };

    return (
        <div className="reschedule-panel">
            <div className="cart-form-field">
                <label>New Date</label>
                <input
                    type="date"
                    min={minDate}
                    max={maxDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {date && (
                <div className="cart-form-field">
                    <label>New Time Slot</label>
                    <div className="slot-chips">
                        {timeSlots.map((s) => {
                            const count = slotCounts[s] || 0;
                            const full = count >= SLOT_CAPACITY;

                            return (
                                <button
                                    key={s}
                                    type="button"
                                    disabled={full}
                                    className={`slot-chip ${slot === s ? "active" : ""} ${full ? "full" : ""
                                        }`}
                                    onClick={() => setSlot(s)}
                                >
                                    {s}
                                    <span className="slot-count">
                                        {full ? "Full" : `${SLOT_CAPACITY - count} left`}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {error && <p className="field-error">{error}</p>}

            <div className="reschedule-actions">
                <button className="show-more-btn" onClick={handleConfirm}>
                    Confirm New Slot
                </button>
                <button className="remove-item-btn" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

function Dashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState("tests");
    const [reschedulingId, setReschedulingId] = useState(null);
    const [, forceRefresh] = useState(0);

    if (!currentUser) {
        return (
            <section className="dashboard-page">
                <div className="empty-cart">
                    <p>Please log in to view your dashboard.</p>
                    <button
                        className="show-more-btn"
                        onClick={() =>
                            navigate("/login", { state: { from: "/dashboard" } })
                        }
                    >
                        Log In
                    </button>
                </div>
            </section>
        );
    }

    const allBookings = getBookingsForUser(currentUser.email);
    const testBookings = allBookings
        .filter((b) => b.type === "test")
        .sort((a, b) => (a.date > b.date ? 1 : -1));
    const appointmentBookings = allBookings.filter(
        (b) => b.type === "appointment"
    );

    const handleCancel = (booking) => {
        const confirmed = window.confirm(
            `Cancel your booking at ${booking.labName} on ${booking.date}? This can't be undone.`
        );
        if (!confirmed) return;

        updateBookingStatus(booking.id, "cancelled");
        unbookSlot(booking.labId, booking.date, booking.slot);
        forceRefresh((n) => n + 1);
    };

    return (
        <section className="dashboard-page">
            <div className="dashboard-heading">
                <div className="section-label">YOUR DASHBOARD</div>
                <h1>Hi, {currentUser.name.split(" ")[0]}</h1>
                <p>
                    View your test bookings, doctor appointments, and reports in one
                    place.
                </p>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={tab === "tests" ? "dashboard-tab active" : "dashboard-tab"}
                    onClick={() => setTab("tests")}
                >
                    Test Bookings ({testBookings.length})
                </button>
                <button
                    className={
                        tab === "appointments" ? "dashboard-tab active" : "dashboard-tab"
                    }
                    onClick={() => setTab("appointments")}
                >
                    Doctor Appointments ({appointmentBookings.length})
                </button>
            </div>

            {tab === "tests" && (
                <div className="dashboard-list">
                    {testBookings.length === 0 ? (
                        <p className="no-results">
                            No test bookings yet.{" "}
                            <span
                                className="dashboard-link"
                                onClick={() => navigate("/tests")}
                            >
                                Browse tests
                            </span>
                        </p>
                    ) : (
                        testBookings.map((booking) => {
                            const displayStatus = getBookingDisplayStatus(booking);
                            const showCancel = canCancelBooking(booking);
                            const showReschedule = canRescheduleBooking(booking);
                            const isUpcoming = displayStatus === "upcoming";

                            return (
                                <div className="dashboard-booking-card" key={booking.id}>
                                    <div className="dashboard-booking-top">
                                        <h3>{booking.labName}</h3>
                                        <span className={`booking-status ${displayStatus}`}>
                                            {displayStatus === "upcoming" && "Upcoming"}
                                            {displayStatus === "completed" && "Completed"}
                                            {displayStatus === "cancelled" && "Cancelled"}
                                        </span>
                                    </div>

                                    <p className="dashboard-booking-meta">
                                        For {booking.patientName} ({booking.patientAge},{" "}
                                        {booking.patientGender}) • {booking.date} •{" "}
                                        {booking.slot} •{" "}
                                        {booking.mode === "home" ? "Home Collection" : "Lab Visit"}
                                    </p>

                                    <div className="dashboard-booking-tests">
                                        {booking.items.map((item) => (
                                            <div className="dashboard-test-row" key={item.testId}>
                                                <span>{item.testName}</span>
                                                <span>₹{item.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="dashboard-booking-footer">
                                        <span className="dashboard-booking-total">
                                            Total: ₹{booking.total}
                                        </span>

                                        {displayStatus === "completed" && (
                                            <button
                                                className="dashboard-report-btn"
                                                disabled
                                                title="Report upload isn't built yet"
                                            >
                                                📄 Report Not Available Yet
                                            </button>
                                        )}

                                        {displayStatus === "cancelled" && (
                                            <span className="dashboard-booking-id">
                                                Booking ID: {booking.id}
                                            </span>
                                        )}
                                    </div>

                                    {isUpcoming && (
                                        <div className="dashboard-booking-actions">
                                            <button
                                                className="reschedule-btn"
                                                disabled={!showReschedule}
                                                title={
                                                    showReschedule
                                                        ? "Pick a new date and slot"
                                                        : `Reschedule must be made at least ${RESCHEDULE_CUTOFF_HOURS} hours before your slot`
                                                }
                                                onClick={() =>
                                                    setReschedulingId(
                                                        reschedulingId === booking.id ? null : booking.id
                                                    )
                                                }
                                            >
                                                {reschedulingId === booking.id
                                                    ? "Close"
                                                    : "Reschedule"}
                                            </button>

                                            <button
                                                className="cancel-booking-btn"
                                                disabled={!showCancel}
                                                title={
                                                    showCancel
                                                        ? "Cancel this booking"
                                                        : `Cancellation must be made at least ${CANCEL_CUTOFF_HOURS} hours before your slot`
                                                }
                                                onClick={() => handleCancel(booking)}
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    )}

                                    {reschedulingId === booking.id && (
                                        <RescheduleForm
                                            booking={booking}
                                            onCancel={() => setReschedulingId(null)}
                                            onDone={() => {
                                                setReschedulingId(null);
                                                forceRefresh((n) => n + 1);
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {tab === "appointments" && (
                <div className="dashboard-list">
                    <p className="no-results">
                        Doctor appointment booking is being built — once it's ready,
                        appointments will show up here automatically.
                    </p>
                </div>
            )}
        </section>
    );
}

export default Dashboard;