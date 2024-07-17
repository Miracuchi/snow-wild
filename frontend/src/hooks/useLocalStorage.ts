import { CART_STORAGE_KEY, CartItem } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const actualDate = new Date(Date.now());
  const DATES_STORAGE_KEY = "dates";
  const [formInfos, setFormInfos] = useState({
    start_date: actualDate,
    end_date: new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate() + 1
    ),
    // materials: []
  });
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    console.log("storedCart", storedCart && JSON.parse(storedCart));

    if (storedCart) {
      setCart(JSON.parse(storedCart));
      console.log("JSON", JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cart]);

  useEffect(() => {
    if (formInfos)
      localStorage.setItem(DATES_STORAGE_KEY, JSON.stringify(formInfos));
  }, [formInfos]);

  return { cart, setCart, formInfos, setFormInfos };
};

export default useLocalStorage;
