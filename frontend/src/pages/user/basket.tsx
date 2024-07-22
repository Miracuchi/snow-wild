import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useState } from "react";

const Basket: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
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
    <main className="container mx-auto px-4 py-8 font-poppins grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2">
        <h1 className="text-3xl text-neutral-950 font-bold mb-8">Votre panier</h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex p-4 items-center">
                <img className="h-24 w-24 object-contain rounded-lg mr-4" src={item.picture} alt={item.name} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                  
                  <p className="text-gray-700 font-bold"> {item.price}€</p>
                  <p className="text-gray-700">Taille : {item.selectedSize}</p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => confirmRemoveItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Récapitulatif</h2>
          <div className="flex justify-between items-center border-b-2 pb-2">
            <p className="text-gray-700">Nombre d'articles :</p>
            <p className="text-gray-700">{totalItems}</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-700">Total :</p>
            <p className="text-gray-700">{totalPrice}€</p>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4 w-full">
            Finaliser la commande
          </button>
          <Link href="/">
            <div className="mt-4 text-center text-blue-500 hover:underline">Continuer vos achats</div>
            <div className="mt-4 text-center text-blue-500 hover:underline">Continuer vos achats</div>
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-gray-800 text-lg mb-4">Êtes-vous sûr de vouloir supprimer cet article de votre panier?</p>
            <div className="flex justify-end">
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
};

export default Basket;