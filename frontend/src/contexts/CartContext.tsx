import useLocalStorage from "@/hooks/useLocalStorage";
import React, { ReactNode, createContext, useContext } from "react";

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
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CART_STORAGE_KEY = "cart";

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { cart, setCart } = useLocalStorage();
  const addToCart = (item: Material) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
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
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
