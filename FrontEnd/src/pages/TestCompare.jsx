import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import testsData from "../data/testsData";
import labsData from "../data/labsData";
import labTestOfferings from "../data/labTestOfferings";
import { useCart } from "../context/CartContext";

function TestCompare() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const [sortBy, setSortBy] = useState("price");
    const [homeOnly, setHomeOnly] = useState(false);

    const test = testsData.find((t) => t.id === Number(id));

    const offers = useMemo(() => {
        if (!test) return [];

        let list = labTestOfferings
            .filter((offer) => offer.testId === test.id)
            .map((offer) => {
                const lab = labsData.find((l) => l.id === offer.labId);
                return { ...offer, lab };
            });

        if (homeOnly) {
            list = list.filter((o) => o.homeCollectionAvailable);
        }

        list.sort((a, b) => {
            if (sortBy === "price") return a.price - b.price;
            if (sortBy === "rating") return b.lab.rating - a.lab.rating;
            return 0;
        });

        return list;
    }, [test, sortBy, homeOnly]);

    if (!test) {
        return (
            <section className="test-compare-page">
                <button className="back-btn" onClick={() => navigate("/tests")}>
                    ← Back to Tests
                </button>
                <p className="no-results">Test not found.</p>
            </section>
        );
    }

    return (
        <section className="test-compare-page">
            <button className="back-btn" onClick={() => navigate("/tests")}>
                ← Back to Tests
            </button>

            <div className="test-compare-heading">
                <div className="section-label">{test.category}</div>
                <h1>{test.name}</h1>
                <p>{test.description}</p>
            </div>

            <div className="test-compare-controls">
                <div className="compare-sort-group">
                    <span>Sort by:</span>
                    <button
                        className={sortBy === "price" ? "sort-chip active" : "sort-chip"}
                        onClick={() => setSortBy("price")}
                    >
                        Price: Low to High
                    </button>
                    <button
                        className={sortBy === "rating" ? "sort-chip active" : "sort-chip"}
                        onClick={() => setSortBy("rating")}
                    >
                        Rating
                    </button>
                </div>

                <label className="home-only-toggle">
                    <input
                        type="checkbox"
                        checked={homeOnly}
                        onChange={(e) => setHomeOnly(e.target.checked)}
                    />
                    Home collection only
                </label>
            </div>

            <div className="lab-offer-count">
                {offers.length} lab{offers.length !== 1 && "s"} offering this test
            </div>

            <div className="lab-offers-list">
                {offers.length === 0 ? (
                    <p className="no-results">
                        No labs match this filter. Try turning off "Home collection only".
                    </p>
                ) : (
                    offers.map((offer) => (
                        <div className="lab-offer-card" key={offer.id}>
                            <div className="lab-offer-info">
                                <h3>{offer.lab.name}</h3>

                                <div className="lab-offer-meta">
                                    <span>⭐ {offer.lab.rating}</span>
                                    <span>•</span>
                                    <span>{offer.lab.city}</span>
                                    <span>•</span>
                                    <span>Report in {offer.turnaroundTime}</span>
                                </div>

                                {offer.homeCollectionAvailable && (
                                    <span className="home-collection-tag">
                                        🏠 Home Collection Available
                                    </span>
                                )}
                            </div>

                            <div className="lab-offer-action">
                                <div className="lab-offer-action-row">
                                    <span className="lab-offer-price">₹{offer.price}</span>

                                    <button
                                        className="book-btn"
                                        onClick={() => {
                                            addToCart(test, offer.lab, offer);
                                            navigate("/tests/cart");
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <Link
                                    to={`/labs/${offer.lab.id}`}
                                    className="see-more-from-lab-link"
                                >
                                    See all tests from {offer.lab.name}
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default TestCompare;