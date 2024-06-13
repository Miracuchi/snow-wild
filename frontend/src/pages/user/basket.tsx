/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const Basket: React.FC = () => {
  const { cart } = useCart();

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
    <main className="container mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl text-neutral-950 font-bold mb-8">Votre panier</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img src={item.picture} alt={item.name} />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/">
          <div className="text-blue-500 hover:underline">
            Continuer vos achats
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Basket;
