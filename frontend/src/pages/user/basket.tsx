import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useState } from "react";

const Basket: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const confirmRemoveItem = (id: string) => {
    setShowConfirmation(true);
    setItemToRemove(id);
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

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8 font-poppins">
        <h1 className="text-3xl text-neutral-950 font-bold mb-8">Votre panier est vide</h1>
        <Link href="/">
          <div className="text-blue-500 hover:underline">Retour à la liste des produits</div>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl text-neutral-950 font-bold mb-8">Votre panier</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white flex rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img src={item.picture} alt={item.name} />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-700">Total :</p>
            <p className="text-gray-700">{totalPrice}€</p>
          </div>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4 w-full"
          >
            Finaliser la commande
          </button>
          <Link href="/">
            <div className="mt-4 text-center text-blue-500 hover:underline">Continuer vos achats</div>
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Êtes-vous sûr de vouloir supprimer cet article de votre panier?</p>
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