import { Heart, Eye, Venus, Smile, Scissors, Syringe, Pill, Brain } from "lucide-react";

const departments = [
  { id: 1, name: "Cardiology", specialty: "Cardiologist", icon: Heart },
  { id: 2, name: "Ophthalmology", specialty: "Ophthalmologist", icon: Eye },
  { id: 3, name: "Gynecology", specialty: "Gynecologist", icon: Venus },
  { id: 4, name: "Dental Care", specialty: "Dentist", icon: Smile },
  { id: 5, name: "Plastic Surgery", specialty: "Plastic Surgeon", icon: Scissors },
  { id: 6, name: "Pediatrics", specialty: "Pediatrician", icon: Syringe },
  { id: 7, name: "Gastrology", specialty: "Gastroenterologist", icon: Pill },
  { id: 8, name: "Neurology", specialty: "Neurologist", icon: Brain },
];

function DepartmentsGrid({ onSelect, activeSpecialty }) {
  return (
    <div className="departments-section">
      <div className="departments-heading">
        <h2>
          Our All <span>Department</span>
        </h2>
        <p>Browse doctors by specialty, or search directly below.</p>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isActive = activeSpecialty === dept.specialty;

          return (
            <div
              key={dept.id}
              className={`department-card ${isActive ? "active" : ""}`}
              onClick={() => onSelect(dept.specialty)}
            >
              <div className="department-icon">
                <Icon size={26} />
              </div>
              <span>{dept.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentsGrid;