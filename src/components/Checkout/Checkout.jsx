import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

export default function Checkout({ onCheckoutComplete, onBack }) {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.perfumes.price * item.quantity);
  }, 0);

  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!fullName || !address || !city || !state || !zipCode) {
        throw new Error('Please fill in all fields');
      }

      const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;

      await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          address: fullAddress,
        })
        .eq('id', user.id);

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_price: finalTotal,
            status: 'pending',
          },
        ])
        .select();

      if (orderError) throw orderError;

      const orderId = orderData[0].id;
      setOrderId(orderId);

      const orderItems = cart.map(item => ({
        order_id: orderId,
        perfume_id: item.perfume_id,
        quantity: item.quantity,
        price: item.perfumes.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await clearCart();
      setOrderPlaced(true);

      setTimeout(() => {
        onCheckoutComplete();
      }, 3000);
    } catch (err) {
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase.</p>
          <div className="order-number">
            <span>Order ID:</span>
            <span className="id-value">{orderId}</span>
          </div>
          <p className="redirect-text">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <button onClick={onBack} className="back-button">← Back to Cart</button>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h1>Checkout</h1>

          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Delivery Information</h2>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
            </div>

            <h2>Address</h2>

            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  placeholder="NY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  placeholder="10001"
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="place-order-btn">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div>
                  <p className="summary-item-name">{item.perfumes.name}</p>
                  <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="summary-item-price">
                  ${(item.perfumes.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
