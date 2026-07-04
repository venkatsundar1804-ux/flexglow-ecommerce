import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x._id === product._id);
      if (existItem) {
        return prev.map(x => 
          x._id === existItem._id ? { ...existItem, qty: existItem.qty + qty } : x
        );
      } else {
        return [...prev, { ...product, qty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(x => x._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(x => x._id === id ? { ...x, qty } : x));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};
