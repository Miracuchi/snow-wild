/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const Basket: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const confirmRemoveItem = (id: string) => {
    setShowConfirmation(true);
    setItemToRemove(id);
  };

  const handleCheckout = () => {
    router.push("/user/reservation");
  };

  const handleRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
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
  console.log(cart);

  return (
    <main className="container flex mx-auto px-4 py-8 font-poppins">
      <div>
        <h1 className="text-3xl text-neutral-950 font-bold mb-8">
          Votre panier
        </h1>
        <div className="bg-dark flex rounded-lg shadow-lg overflow-hidden grid grid-cols-1 gap-4 ">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white flex rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  className="m-5 max-w-28 object-contain"
                  src={item.picture}
                  alt={item.name}
                />
              </div>
              <div className="p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <p className="text-gray-700">{item.description}</p>
                  <p className="text-gray-700">{item.price}€</p>
                  <p className="text-gray-700">Taille : {item.selectedSize}</p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2">Quantité:</span>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="px-2 py-1 border rounded"
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => confirmRemoveItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  &#x2715;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Récapitulatif</h2>
        <p className="text-gray-700">Nombre d'articles : {totalItems}</p>
        <p className="text-gray-700">Total : {totalPrice}€</p>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4">
          Finaliser la commande
        </button>
      </div>
      <div className="mt-4">
        <Link href="/">
          <div className="text-blue-500 hover:underline">
            Continuer vos achats
          </div>
        </Link>
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
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
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
};

export default Basket;
