import { useNavigate } from "react-router-dom";
import testsData from "../data/testsData";
import TestCategoriesGrid from "../components/TestCategoriesGrid";

function TestCategoriesSection() {
    const navigate = useNavigate();

    const categories = [...new Set(testsData.map((t) => t.category))];

    const handleSelect = (category) => {
        navigate("/tests", { state: { category } });
    };

    return (
        <section className="test-categories-home-section">
            <TestCategoriesGrid
                categories={categories}
                testsData={testsData}
                onSelect={handleSelect}
                activeCategory=""
            />

            <div className="show-more-wrap">
                <button className="show-more-btn" onClick={() => navigate("/tests")}>
                    Show All Tests
                </button>
            </div>
        </section>
    );
}

export default TestCategoriesSection;