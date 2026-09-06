import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import labsData from "../data/labsData";
import labTestOfferings from "../data/labTestOfferings";
import testsData from "../data/testsData";
import hospitalsData from "../data/hospitalsData";
import { useCart } from "../context/CartContext";

function LabProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, addToCart } = useCart();
    const [addedIds, setAddedIds] = useState([]);

    const lab = labsData.find((l) => l.id === Number(id));

    if (!lab) {
        return (
            <section className="lab-profile-page">
                <button className="back-btn" onClick={() => navigate("/labs")}>
                    ← Back to Labs
                </button>
                <p className="no-results">Lab not found.</p>
            </section>
        );
    }

    const offerings = labTestOfferings
        .filter((o) => o.labId === lab.id)
        .map((o) => ({ ...o, test: testsData.find((t) => t.id === o.testId) }));

    const parentHospital = lab.hospitalId
        ? hospitalsData.find((h) => h.id === lab.hospitalId)
        : null;

    const handleAdd = (offer) => {
        addToCart(offer.test, lab, offer);
        setAddedIds((prev) => [...prev, offer.test.id]);
    };

    return (
        <section className="lab-profile-page">
            <button className="back-btn" onClick={() => navigate("/labs")}>
                ← Back to Labs
            </button>

            <div className="lab-profile-heading">
                <div className="section-label">{lab.city.toUpperCase()}</div>
                <h1>{lab.name}</h1>
                <p>⭐ {lab.rating} rating — all tests offered by this lab, in one place.</p>

                {parentHospital && (
                    <p
                        className="dashboard-link"
                        onClick={() => navigate(`/hospitals/${parentHospital.id}`)}
                    >
                        Part of {parentHospital.name} →
                    </p>
                )}
            </div>

            {cart.items.length > 0 && cart.labId === lab.id && (
                <div className="lab-cart-banner">
                    <span>
                        {cart.items.length} test{cart.items.length !== 1 && "s"} in your
                        cart from this lab.
                    </span>
                    <button
                        className="show-more-btn"
                        onClick={() => navigate("/tests/cart")}
                    >
                        Go to Cart
                    </button>
                </div>
            )}

            <div className="lab-offers-list">
                {offerings.map((offer) => {
                    const alreadyInCart =
                        cart.labId === lab.id &&
                        cart.items.some((i) => i.testId === offer.test.id);
                    const justAdded = addedIds.includes(offer.test.id);
                    const added = alreadyInCart || justAdded;

                    return (
                        <div className="lab-offer-card" key={offer.id}>
                            <div className="lab-offer-info">
                                <h3>{offer.test.name}</h3>

                                <div className="lab-offer-meta">
                                    <span>{offer.test.category}</span>
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
                                <span className="lab-offer-price">₹{offer.price}</span>

                                <button
                                    className={added ? "book-btn added" : "book-btn"}
                                    disabled={added}
                                    onClick={() => handleAdd(offer)}
                                >
                                    {added ? "✓ Added" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default LabProfile;