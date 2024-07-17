import { useQuery } from "@apollo/client";
import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { MaterialQuery } from "@/types/material";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";


function ListMaterial() {
const { data, loading, error } = useQuery<MaterialQuery>(LIST_MATERIAL);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <main className="container mx-auto px-4 py-8 font-poppins">
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {data?.listMaterials.map((item) => (
        <li
          key={item.id.toString()}
          className="bg-white  overflow-hidden transform transition duration-500 hover:scale-105"
        >
          <Link href={`/${item.id}`}>
            <div className="block">
              <div className="relative flex rounded-lg shadow-lg justify-center items-center h-52 overflow-hidden  rounded-t-lg">
                <img
                  className="object-cover h-full "
                  src={item.picture}
                  alt={item.name}
                />
                <div className="absolute   inset-0 bg-gradient-to-b from-transparent to-neutral-700  opacity-50"></div>
              </div>
              <div className="relative p-6">
                <h2 className=" uppercase text-xl text-neutral-950 font-bold ">
                  {item.name}
                </h2>
                <p className=" text-neutral-950 text-sm ">
                  {item.description.slice(0, 80)}
                  {item.description.length > 80 ? "..." : ""}
                </p>
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