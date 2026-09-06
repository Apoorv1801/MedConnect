import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import doctorsData from "../data/doctorsData";
import { saveBooking } from "../utils/bookingsStore";
import timeSlots from "../data/timeSlots";
import {
    SLOT_CAPACITY,
    getSlotCount,
    isSlotFull,
    bookSlot,
} from "../utils/slotAvailability";

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

function DoctorBooking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const doctor = doctorsData.find((d) => d.id === Number(id));

    // Slot capacity is tracked per-doctor using a "doctor-<id>" key, the
    // same shared store the Tests module uses for labs — see
    // getBookingResourceKey in slotAvailability.js for why the prefix
    // matters.
    const resourceKey = doctor ? `doctor-${doctor.id}` : null;

    const [mode, setMode] = useState("in-person");
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");
    const [phone, setPhone] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [errors, setErrors] = useState({});

    const { min: minDate, max: maxDate } = getDateBounds();

    // Slot counts are derived purely from date/resourceKey — no need for
    // state or an effect, just recompute when either changes.
    const slotCounts = useMemo(() => {
        if (!date || !resourceKey) return {};

        const counts = {};
        timeSlots.forEach((s) => {
            counts[s] = getSlotCount(resourceKey, date, s);
        });
        return counts;
    }, [date, resourceKey]);

    // Reset the chosen slot whenever the date changes, since a slot from
    // a previous date may not apply. Adjusting state during render (rather
    // than in an effect) is the pattern React recommends for this —
    // see https://react.dev/learn/you-might-not-need-an-effect
    const [prevDate, setPrevDate] = useState(date);
    if (date !== prevDate) {
        setPrevDate(date);
        setSlot("");
    }

    const validate = () => {
        const newErrors = {};

        if (!date) {
            newErrors.date = "Please select a date.";
        }

        if (date && !slot) {
            newErrors.slot = "Please select a time slot.";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
            newErrors.phone = "Enter a valid 10-digit mobile number.";
        }

        if (!patientName.trim()) {
            newErrors.patientName = "Patient name is required.";
        }

        if (!patientAge.trim()) {
            newErrors.patientAge = "Patient age is required.";
        } else if (
            !/^\d+$/.test(patientAge.trim()) ||
            Number(patientAge) < 0 ||
            Number(patientAge) > 120
        ) {
            newErrors.patientAge = "Enter a valid age (0-120).";
        }

        if (!patientGender) {
            newErrors.patientGender = "Please select the patient's gender.";
        }

        return newErrors;
    };

    const handleConfirm = () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Re-check right before confirming, in case the slot filled up
        // while the user was filling out the form.
        if (isSlotFull(resourceKey, date, slot)) {
            setErrors({ slot: "This slot just got fully booked. Please pick another." });
            return;
        }

        bookSlot(resourceKey, date, slot);

        const booking = {
            id: `MC-${Math.floor(100000 + Math.random() * 900000)}`,
            type: "appointment",
            userEmail: currentUser.email,
            status: "upcoming",
            date,
            slot,
            createdAt: new Date().toISOString(),
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
            hospitalName: doctor.hospital,
            fee: doctor.fee,
            mode,
            phone,
            patientName,
            patientAge,
            patientGender,
        };

        saveBooking(booking);
        navigate("/find-doctor/confirmation", { state: { booking } });
    };

    if (!doctor) {
        return (
            <section className="doctor-booking-page">
                <button className="back-btn" onClick={() => navigate("/find-doctor")}>
                    ← Back to Find Doctor
                </button>
                <p className="no-results">Doctor not found.</p>
            </section>
        );
    }

    if (!currentUser) {
        return (
            <section className="doctor-booking-page">
                <button className="back-btn" onClick={() => navigate("/find-doctor")}>
                    ← Back to Find Doctor
                </button>

                <div className="empty-cart">
                    <p>
                        You need to log in to book an appointment with {doctor.name}.
                        Your selection will still be here when you get back.
                    </p>
                    <button
                        className="show-more-btn"
                        onClick={() =>
                            navigate("/login", { state: { from: `/find-doctor/${doctor.id}` } })
                        }
                    >
                        Log In
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="doctor-booking-page">
            <button className="back-btn" onClick={() => navigate("/find-doctor")}>
                ← Back to Find Doctor
            </button>

            <div className="doctor-booking-heading">
                <div className="section-label">BOOK APPOINTMENT</div>
                <h1>{doctor.name}</h1>
                <p>
                    {doctor.specialty} • {doctor.hospital}, {doctor.location}
                </p>
            </div>

            <div className="doctor-booking-summary">
                <span>{doctor.experience} yrs experience</span>
                <span>•</span>
                <span>⭐ {doctor.rating}</span>
                <span>•</span>
                <span>₹{doctor.fee} consultation fee</span>
            </div>

            <div className="cart-checkout-panel">
                <div className="mode-toggle">
                    <button
                        className={mode === "in-person" ? "mode-chip active" : "mode-chip"}
                        onClick={() => setMode("in-person")}
                    >
                        In-Person Visit
                    </button>
                    <button
                        className={mode === "video" ? "mode-chip active" : "mode-chip"}
                        onClick={() => setMode("video")}
                    >
                        Video Consultation
                    </button>
                </div>

                <p className="checkout-subheading">Patient Details</p>

                <div className="cart-form-field">
                    <label>Patient Name</label>
                    <input
                        type="text"
                        placeholder="Full name of the patient"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                    />
                    {errors.patientName && (
                        <p className="field-error">{errors.patientName}</p>
                    )}
                </div>

                <div className="cart-form-row-inline">
                    <div className="cart-form-field">
                        <label>Age</label>
                        <input
                            type="number"
                            min="0"
                            max="120"
                            placeholder="Age"
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                        />
                        {errors.patientAge && (
                            <p className="field-error">{errors.patientAge}</p>
                        )}
                    </div>

                    <div className="cart-form-field">
                        <label>Gender</label>
                        <select
                            value={patientGender}
                            onChange={(e) => setPatientGender(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.patientGender && (
                            <p className="field-error">{errors.patientGender}</p>
                        )}
                    </div>
                </div>

                <p className="checkout-subheading">Appointment Details</p>

                <div className="cart-form-field">
                    <label>Date</label>
                    <input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <p className="field-hint">
                        Appointments open from tomorrow, up to 30 days ahead.
                    </p>
                    {errors.date && <p className="field-error">{errors.date}</p>}
                </div>

                <div className="cart-form-field">
                    <label>Time Slot</label>

                    {!date && (
                        <p className="field-hint">Pick a date to see available slots.</p>
                    )}

                    {date && (
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
                    )}

                    {errors.slot && <p className="field-error">{errors.slot}</p>}
                </div>

                <div className="cart-form-field">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="field-error">{errors.phone}</p>}
                </div>

                <div className="cart-total-row">
                    <span>Consultation Fee</span>
                    <span className="cart-total-price">₹{doctor.fee}</span>
                </div>

                <button className="confirm-booking-btn" onClick={handleConfirm}>
                    Confirm Appointment
                </button>
            </div>
        </section>
    );
}

export default DoctorBooking;
