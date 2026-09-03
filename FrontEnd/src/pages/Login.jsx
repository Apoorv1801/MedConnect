import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const redirectTo = location.state?.from || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const result = login({ email, password });

        if (!result.success) {
            setError(result.error);
            return;
        }

        navigate(redirectTo, { replace: true });
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="section-label">WELCOME BACK</div>
                <h1>Log in to MedConnect</h1>
                <p>Access your bookings, prescriptions, and reports.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="cart-form-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="cart-form-field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <p className="field-error">{error}</p>}

                    <button type="submit" className="confirm-booking-btn">
                        Log In
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;