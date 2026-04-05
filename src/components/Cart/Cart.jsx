import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart({ onCheckout }) {
  const { cart, removeFromCart, updateCartQuantity } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.perfumes.price * item.quantity);
  }, 0);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    updateCartQuantity(cartItemId, newQuantity);
  };

  const handleRemove = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-hint">Add some perfumes to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image-container">
                {item.perfumes.image_url ? (
                  <img
                    src={item.perfumes.image_url}
                    alt={item.perfumes.name}
                    className="item-image"
                  />
                ) : (
                  <div className="item-image-placeholder">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.perfumes.name}</h3>
                <p className="item-brand">{item.perfumes.brand}</p>
                <p className="item-volume">{item.perfumes.volume_ml}ml</p>
              </div>

              <div className="item-quantity">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="qty-btn"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="item-price">
                <p className="item-total">${(item.perfumes.price * item.quantity).toFixed(2)}</p>
                <p className="item-unit">${item.perfumes.price.toFixed(2)} each</p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="remove-btn"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row summary-divider">
            <span>Tax (estimated)</span>
            <span>${(totalPrice * 0.08).toFixed(2)}</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>

          <button
            onClick={onCheckout}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>

          <p className="continue-shopping-hint">
            Continue browsing our collection
          </p>
        </div>
      </div>
    </div>
  );
}
