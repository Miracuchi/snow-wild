import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Material {
  id: string;
  name: string;
  description: string;
  picture: string;
}

interface CartContextType {
  cart: Material[];
  addToCart: (item: Material) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Material[]>([]);

  const addToCart = (item: Material) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};