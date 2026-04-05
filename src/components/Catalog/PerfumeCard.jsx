import './Catalog.css';

export default function PerfumeCard({ perfume, onAddToCart }) {
  const handleAddClick = () => {
    onAddToCart(perfume.id);
  };

  return (
    <div className="perfume-card">
      <div className="perfume-image-container">
        {perfume.image_url ? (
          <img
            src={perfume.image_url}
            alt={perfume.name}
            className="perfume-image"
          />
        ) : (
          <div className="perfume-image-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="perfume-info">
        <h3 className="perfume-name">{perfume.name}</h3>
        <p className="perfume-brand">{perfume.brand}</p>

        {perfume.fragrance_type && (
          <span className="perfume-type">{perfume.fragrance_type}</span>
        )}

        <p className="perfume-description">{perfume.description}</p>

        <div className="perfume-meta">
          <span className="volume">{perfume.volume_ml}ml</span>
          {perfume.rating > 0 && (
            <span className="rating">★ {perfume.rating.toFixed(1)}</span>
          )}
        </div>

        <div className="perfume-footer">
          <span className="price">${perfume.price.toFixed(2)}</span>
          <button
            onClick={handleAddClick}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
