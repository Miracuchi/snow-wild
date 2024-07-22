"use client";
import { CartItem } from "@/contexts/CartContext";
import { FormInfos } from "@/pages/user/reservation/ReservationFristStep";
import { FormDataCard } from "@/pages/user/reservation/ReservationSecondStep";

export const EmptyLocalStorage = (...storageKeys: string[]) => {
  storageKeys.forEach((key: string) => {
    localStorage.removeItem(key);
  });
};

export const SetToLocalStorage = (
  storageKey: string,
  itemToStore: CartItem[] | FormDataCard | FormInfos
) => {
  if (itemToStore)
    localStorage.setItem(storageKey, JSON.stringify(itemToStore));
};

export const GetFromLocalStorage = (storageKey: string) => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(storageKey);
    if (storedItem) return JSON.parse(storedItem);
  }
};
