import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { useQuery } from "@apollo/client";
import { MaterialQuery } from "@/types/material";
import Link from "next/link";

function ListMaterial() {
  const { data, loading, error } = useQuery<MaterialQuery>(LIST_MATERIAL);
  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">



      <h1 className="text-3xl text-neutral-950 font-bold mb-8">Liste des produits</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.listMaterials.map((item) => (
          <li key={item.id.toString()} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <h2 className="z-20 bg-transparent text-xl text-neutral-950 font-bold mb-2 p-4">{item.name}</h2>
            <div className="relative h-48 z-10">
              <img src={item.picture} alt={item.name} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
              
              <p className="text-gray z-20">{item.description.slice(0, 90)}{item.description.length > 90 ? "..." : ""}
              <Link className="text-gray hover:underline ml-2 hover:font-bold cursor-pointer" href={`/${item.id}`}>Voir détails</Link></p>
                
              <div className="mt-4 flex justify-end">
                <button className="z-20 px-4 py-2 bg-neutral-950 text-white rounded hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer">Ajouter au panier</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ListMaterial;