import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <p>This page doesn't exist — it may have moved or been mistyped.</p>
                <button className="show-more-btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </section>
    );
}

export default NotFound;