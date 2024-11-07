/* eslint-disable @next/next/no-img-element */
import AuthContext from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/user/components/cart/CartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState<string | null>(null);
  const [itemSizeToRemove, setItemSizeToRemove] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useContext(AuthContext);

  const confirmRemoveItem = (id: string, selectedSize: string) => {
    setShowConfirmation(true);
    setItemIdToRemove(id);
    setItemSizeToRemove(selectedSize);
  };

  const handleCheckout = () => {
    if (user?.userId) {
      router.push("/user/reservations/create");
    } else {
      router.push("/auth/login?redirect=/user/reservation");
    }
  };

  const handleRemoveItem = () => {
    if (itemIdToRemove && itemSizeToRemove) {
      removeFromCart(itemIdToRemove, itemSizeToRemove);
      setItemIdToRemove(null);
      setItemSizeToRemove(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelRemove = () => {
    setItemIdToRemove(null);
    setShowConfirmation(false);
  };
  const numberOfArticleText = "Nombre d'articles";
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8 font-poppins">
        <h1 className="text-3xl text-neutral-950 font-bold mb-8">
          Votre panier est vide
        </h1>
        <Link href="/">
          <div className="text-blue-500 hover:underline">
            Retour à la liste des produits
          </div>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 font-poppins grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2">
        <h1 className="text-3xl text-neutral-950 font-bold mb-8">
          Votre panier
        </h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={`${item.id}-${item.selectedSize}`}
              id={item.id}
              name={item.name}
              picture={item.picture}
              selectedSize={item.selectedSize}
              quantity={item.quantity}
              price={item.price}
              description={item.description}
              onQuantityChange={(quantity) =>
                updateQuantity(item.id, item.selectedSize, quantity)
              }
              onRemove={() => confirmRemoveItem(item.id, item.selectedSize)}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 mt-[69px]">
        <div className=" p-5 rounded-lg border-4 border-blue-300 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
          <div className="flex justify-between items-center border-b-2 pb-2">
            <p className="text-gray-700">{numberOfArticleText}</p>
            <p className="text-gray-700">{totalItems}</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-700">Total :</p>
            <p className="text-gray-700">{totalPrice}€</p>
          </div>

          <button
            onClick={handleCheckout}
            className="p-4 bg-neutral-900 w-full text-white rounded-full hover:bg-neutral-700 mt-6 "
          >
            Finaliser la commande
          </button>
          <Link href="/">
            <div className="mt-4 text-center text-neutral-900 hover:underline">
              Continuer vos achats
            </div>
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>
              Êtes-vous sûr de vouloir supprimer cet article de votre panier?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCancelRemove}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleRemoveItem}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
