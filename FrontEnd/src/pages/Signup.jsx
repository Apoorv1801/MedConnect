import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required.";

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
            newErrors.phone = "Enter a valid 10-digit mobile number.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const result = signup({ name, email, phone, password });

        if (!result.success) {
            setErrors({ email: result.error });
            return;
        }

        navigate("/", { replace: true });
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="section-label">CREATE ACCOUNT</div>
                <h1>Sign up for MedConnect</h1>
                <p>
                    Patient accounts only for now — doctor, lab, and hospital sign-up
                    will get their own dedicated flow once those dashboards are built.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="cart-form-field">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                        />
                        {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>

                    <div className="cart-form-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>

                    <div className="cart-form-field">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10-digit mobile number"
                        />
                        {errors.phone && <p className="field-error">{errors.phone}</p>}
                    </div>

                    <div className="cart-form-field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                        />
                        {errors.password && (
                            <p className="field-error">{errors.password}</p>
                        )}
                    </div>

                    <div className="cart-form-field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                        />
                        {errors.confirmPassword && (
                            <p className="field-error">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button type="submit" className="confirm-booking-btn">
                        Sign Up
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}

export default Signup;