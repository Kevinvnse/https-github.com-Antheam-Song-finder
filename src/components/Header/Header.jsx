import { signOut } from '../../lib/auth';
import './Header.css';

export default function Header({ cartCount, onNavigation, user, currentPage }) {
  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-content">
        <button
          className="logo"
          onClick={() => onNavigation('catalog')}
        >
          <span className="logo-icon">✨</span>
          <span>Perfume Store</span>
        </button>

        <nav className="nav">
          <button
            className={`nav-button ${currentPage === 'catalog' ? 'active' : ''}`}
            onClick={() => onNavigation('catalog')}
          >
            Shop
          </button>
          <button
            className={`nav-button cart-button ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => onNavigation('cart')}
          >
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>

        <div className="header-user">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
