import { Droplet, Activity, ScanLine, TestTube, HeartPulse } from "lucide-react";

const categoryIcons = {
  "Blood Test": Droplet,
  Diabetes: Activity,
  Imaging: ScanLine,
  "Urine Test": TestTube,
  Cardiac: HeartPulse,
};

function TestCategoriesGrid({ categories, testsData, onSelect, activeCategory }) {
  return (
    <div className="test-departments-section">
      <div className="test-departments-heading">
        <h2>
          Browse By <span>Category</span>
        </h2>
        <p>Browse tests by category, or search directly below.</p>
      </div>

      <div className="test-departments-grid">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat] || Droplet;
          const isActive = activeCategory === cat;
          const count = testsData.filter((t) => t.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              className={`test-department-card ${isActive ? "active" : ""}`}
              onClick={() => onSelect(cat)}
            >
              <div className="test-department-icon">
                <Icon size={26} />
              </div>
              <span>{cat}</span>
              <p className="test-department-count">
                {count} test{count !== 1 && "s"} available
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TestCategoriesGrid;