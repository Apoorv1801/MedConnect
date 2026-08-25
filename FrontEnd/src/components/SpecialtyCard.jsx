function SpecialtyCard({ title, image, description, onClick }) {
    return (
        <div className="specialty-card" onClick={onClick}>

            <div className="specialty-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="specialty-image"
                    loading="lazy"
                />
            </div>

            <div className="specialty-content">
                <h3>{title}</h3>

                <p>{description}</p>

                <button>
                    Find Doctors →
                </button>
            </div>

        </div>
    );
}

export default SpecialtyCard;