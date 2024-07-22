import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Material {
  id: string;
  name: string;
  description: string;
  picture: string;
  price: number;
}

export interface CartItem extends Material {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Material, selectedSize:string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getItemCount: () => number;
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

const CART_STORAGE_KEY = 'cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Material, selectedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === selectedSize
      );
      if (existingItem) {
        // Si l'article existe avec la même taille, mettre à jour la quantité
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Ajouter un nouvel article avec la taille sélectionnée
        return [...prevCart, { ...item, quantity: 1, selectedSize }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // utilisation d'un compteur pour le panier 
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};