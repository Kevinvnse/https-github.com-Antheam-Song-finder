import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, perfumes(*)')
        .eq('user_id', user.id);

      if (error) throw error;
      setCart(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (perfumeId, quantity = 1) => {
    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('perfume_id', perfumeId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert([{ user_id: user.id, perfume_id: perfumeId, quantity }]);
      }

      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartQuantity = async (cartItemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
      } else {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', cartItemId);
        await fetchCart();
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
