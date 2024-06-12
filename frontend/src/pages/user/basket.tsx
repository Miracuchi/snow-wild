import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

const Basket: React.FC = () => {
  const { cart } = useCart();

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
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
    </main>
  );
};

export default Basket;