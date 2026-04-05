import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Header from './components/Header/Header';
import PerfumeCatalog from './components/Catalog/PerfumeCatalog';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import './App.css';

export default function App() {
  const { user, loading } = useAuth();
  const { cart } = useCart();
  const [currentPage, setCurrentPage] = useState('catalog');
  const [authMode, setAuthMode] = useState('login');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {authMode === 'login' ? (
          <Login
            onLoginSuccess={() => setCurrentPage('catalog')}
            onSwitchToSignUp={() => setAuthMode('signup')}
          />
        ) : (
          <SignUp
            onSignUpSuccess={() => setAuthMode('login')}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </>
    );
  }

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onNavigation={handleNavigation}
        user={user}
        currentPage={currentPage}
      />

      <main className="main-content">
        {currentPage === 'catalog' && <PerfumeCatalog />}
        {currentPage === 'cart' && (
          <Cart onCheckout={() => setCurrentPage('checkout')} />
        )}
        {currentPage === 'checkout' && (
          <Checkout
            onCheckoutComplete={() => setCurrentPage('catalog')}
            onBack={() => setCurrentPage('cart')}
          />
        )}
      </main>
    </div>
  );
}
