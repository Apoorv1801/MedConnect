import { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import testsData from "../data/testsData";

function TestSearch() {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState(location.state?.category || "");

    const categories = useMemo(
        () => [...new Set(testsData.map((test) => test.category))],
        []
    );

    const filteredTests = useMemo(() => {
        return testsData.filter((test) => {
            const matchesSearch = test.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            const matchesCategory = category ? test.category === category : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchText, category]);

    return (
        <section className="test-search-page">
            <button className="back-btn" onClick={() => navigate("/")}>
                ← Back to Home
            </button>

            <div className="test-search-heading">
                <div className="section-label">DIAGNOSTIC TESTS</div>
                <h1>
                    Find and book
                    <br />
                    <span>the right test for you.</span>
                </h1>
                <p>
                    Compare prices across laboratories, choose home collection where
                    available, and book your test in minutes.
                </p>

                <Link to="/labs" className="browse-by-lab-link">
                    Prefer to book by lab instead? Browse all labs →
                </Link>
            </div>

            <div className="test-search-controls">
                <input
                    type="text"
                    placeholder="Search tests by name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => {
                        setSearchText("");
                        setCategory("");
                    }}
                >
                    Reset
                </button>
            </div>

            <div className="test-results-count">
                {filteredTests.length} test
                {filteredTests.length !== 1 && "s"} found
            </div>

            <div className="test-results-grid">
                {filteredTests.length === 0 ? (
                    <p className="no-results">No tests match your search.</p>
                ) : (
                    filteredTests.map((test) => (
                        <div className="test-card" key={test.id}>
                            <div className="test-card-top">
                                <span className="test-category-tag">{test.category}</span>
                                {test.homeCollectionAvailable && (
                                    <span className="home-collection-tag">
                                        🏠 Home Collection
                                    </span>
                                )}
                            </div>

                            <h3>{test.name}</h3>
                            <p className="test-description">{test.description}</p>

                            <div className="test-card-footer">
                                <span className="test-price">
                                    From ₹{test.startingPrice}
                                </span>

                                {/* Now links to the real comparison page. */}
                                <Link
                                    to={`/tests/${test.id}`}
                                    className="compare-labs-btn"
                                >
                                    Compare Labs →
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default TestSearch;