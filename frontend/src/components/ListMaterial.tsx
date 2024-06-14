import { useQuery } from "@apollo/client";
import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { MaterialQuery } from "@/types/material";
import { useCart } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

function ListMaterial() {
  const { data, loading, error } = useQuery<MaterialQuery>(LIST_MATERIAL);
  console.log("data", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

 

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {data?.listMaterials.map((item) => (
      <li
        key={item.id.toString()}
        className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
      >
       
        <div className="relative flex justify-center items-center h-52 overflow-hidden rounded-t-lg">
          <img
            className="object-contain h-full"
            src={item.picture}
            alt={item.name}
          />
        </div>
        <div className="p-6">
           <h2 className="text-center uppercase text-xl text-neutral-950 font-bold mb-2 p-4">
          {item.name}
        </h2>
          <p className="text-white mb-4">
            {item.description.slice(0, 90)}
            {item.description.length > 90 ? "..." : ""}
            <Link
              href={`/${item.id}`}
              className="text-white hover:underline ml-2 hover:font-bold"
            >
              Voir détails
            </Link>
          </p>
        </div>
      </li>
    ))}
  </ul>
</main>
  );
}

export default ListMaterial;