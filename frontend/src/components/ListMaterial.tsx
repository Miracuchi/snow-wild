import { useQuery } from "@apollo/client";
import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { MaterialQuery } from "@/types/material";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

function ListMaterial() {
  const { data, loading, error } = useQuery<MaterialQuery>(LIST_MATERIAL);
  const { addToCart } = useCart(); // Import du contexte du panier
  console.log("data", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddToCart = (item: any) => {
    addToCart(item);
    // Ici, tu peux ajouter la logique pour afficher une notification ou un message confirmant l'ajout au panier
  };

  return (
<main className="container mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl text-neutral-950 font-bold mb-8">
        Liste des produits
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.listMaterials.map((item) => (
          <li
            key={item.id.toString()}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <h2 className="z-20 bg-transparent text-xl text-neutral-950 font-bold mb-2 p-4">
              {item.name}
            </h2>
            <div className="relative h-48 z-10">
              <img
              className="object-contain"
                src={item.picture}
                alt={item.name}
                
              />
            </div>
            <div className="p-6">
              <p className="text-white z-20">
                {item.description.slice(0, 90)}
                {item.description.length > 90 ? "..." : ""}
                <Link
                  href={`/${item.id}`} // Utilisation de la template string pour créer le lien
                  className="text-gray hover:underline ml-2 hover:font-bold cursor-pointer"
                >
                  Voir détails
                </Link>
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  className="z-20 px-4 py-2 bg-neutral-950 text-white rounded hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"
                  onClick={() => handleAddToCart(item)} // Appel de la fonction handleAddToCart avec l'article en paramètre
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </main>
);
}

export default ListMaterial;