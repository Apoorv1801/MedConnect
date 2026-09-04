import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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

function TestCart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const allHomeEligible =
        cart.items.length > 0 &&
        cart.items.every((i) => i.homeCollectionAvailable);

    const [mode, setMode] = useState(allHomeEligible ? "home" : "visit");
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [slotCounts, setSlotCounts] = useState({});
    const [errors, setErrors] = useState({});

    const { min: minDate, max: maxDate } = getDateBounds();
    const total = cart.items.reduce((sum, i) => sum + i.price, 0);

    // Recompute slot availability whenever the date changes, and reset
    // the chosen slot since availability is date-specific.
    useEffect(() => {
        if (!date || !cart.labId) {
            setSlotCounts({});
            return;
        }

        const counts = {};
        timeSlots.forEach((s) => {
            counts[s] = getSlotCount(cart.labId, date, s);
        });
        setSlotCounts(counts);
        setSlot("");
    }, [date, cart.labId]);

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

        if (mode === "home") {
            if (!address.trim()) {
                newErrors.address = "Address is required for home collection.";
            } else if (address.trim().length < 10) {
                newErrors.address =
                    "Please enter a complete address (at least 10 characters).";
            }
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
        if (isSlotFull(cart.labId, date, slot)) {
            setErrors({ slot: "This slot just got fully booked. Please pick another." });
            return;
        }

        bookSlot(cart.labId, date, slot);

        const booking = {
            id: `MC-${Math.floor(100000 + Math.random() * 900000)}`,
            type: "test",
            userEmail: currentUser.email,
            status: "upcoming",
            date,
            slot,
            createdAt: new Date().toISOString(),
            labId: cart.labId,
            labName: cart.labName,
            items: cart.items,
            total,
            mode,
            phone,
            patientName,
            patientAge,
            patientGender,
            address: mode === "home" ? address : null,
        };

        saveBooking(booking);
        clearCart();
        navigate("/tests/confirmation", { state: { booking } });
    };

    if (cart.items.length === 0) {
        return (
            <section className="test-cart-page">
                <button className="back-btn" onClick={() => navigate("/tests")}>
                    ← Back to Tests
                </button>

                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <button
                        className="show-more-btn"
                        onClick={() => navigate("/tests")}
                    >
                        Browse Tests
                    </button>
                </div>
            </section>
        );
    }

    if (!currentUser) {
        return (
            <section className="test-cart-page">
                <button className="back-btn" onClick={() => navigate("/tests")}>
                    ← Back to Tests
                </button>

                <div className="empty-cart">
                    <p>
                        You need to log in to complete this booking. Your {cart.items.length}{" "}
                        selected test{cart.items.length !== 1 && "s"} will still be here
                        when you get back.
                    </p>
                    <button
                        className="show-more-btn"
                        onClick={() =>
                            navigate("/login", { state: { from: "/tests/cart" } })
                        }
                    >
                        Log In
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="test-cart-page">
            <button className="back-btn" onClick={() => navigate("/tests")}>
                ← Back to Tests
            </button>

            <div className="test-cart-heading">
                <div className="section-label">YOUR CART</div>
                <h1>Tests from {cart.labName}</h1>
                <p>Review your selected tests and choose a collection slot.</p>
            </div>

            <Link to={`/labs/${cart.labId}`} className="add-more-from-lab-link">
                + Add more tests from {cart.labName}
            </Link>

            <div className="cart-items-list">
                {cart.items.map((item) => (
                    <div className="cart-item-card" key={item.testId}>
                        <div>
                            <h3>{item.testName}</h3>
                            {item.homeCollectionAvailable && (
                                <span className="home-collection-tag">
                                    🏠 Home Collection
                                </span>
                            )}
                        </div>

                        <div className="cart-item-action">
                            <span className="test-price">₹{item.price}</span>
                            <button
                                className="remove-item-btn"
                                onClick={() => removeFromCart(item.testId)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-checkout-panel">
                {allHomeEligible ? (
                    <div className="mode-toggle">
                        <button
                            className={mode === "visit" ? "mode-chip active" : "mode-chip"}
                            onClick={() => setMode("visit")}
                        >
                            Visit Lab
                        </button>
                        <button
                            className={mode === "home" ? "mode-chip active" : "mode-chip"}
                            onClick={() => setMode("home")}
                        >
                            Home Collection
                        </button>
                    </div>
                ) : (
                    <p className="mode-note">
                        One or more selected tests don't support home collection, so
                        this booking will be a lab visit.
                    </p>
                )}

                <p className="checkout-subheading">Patient Details</p>

                <div className="cart-form-field">
                    <label>Patient Name</label>
                    <input
                        type="text"
                        placeholder="Full name of the person being tested"
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

                <p className="checkout-subheading">Booking Details</p>

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
                        Bookings open from tomorrow, up to 30 days ahead.
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

                {mode === "home" && (
                    <div className="cart-form-field">
                        <label>Collection Address</label>
                        <textarea
                            placeholder="Enter the full address for sample collection..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && (
                            <p className="field-error">{errors.address}</p>
                        )}
                    </div>
                )}

                <div className="cart-total-row">
                    <span>Total</span>
                    <span className="cart-total-price">₹{total}</span>
                </div>

                <button className="confirm-booking-btn" onClick={handleConfirm}>
                    Confirm Booking
                </button>
            </div>
        </section>
    );
}

export default TestCart;