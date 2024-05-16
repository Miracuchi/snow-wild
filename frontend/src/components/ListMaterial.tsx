import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { useQuery } from "@apollo/client";
import { MaterialQuery } from "@/types/material";
import Image from "next/image"; 

function ListMaterial() {
  const { data, loading, error } = useQuery<MaterialQuery>(LIST_MATERIAL);
   console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="list-decimal">
        {data?.listMaterials.map((item) => (
          <li key={item.id.toString()}>{item.name}<img src={item.picture} alt={item.name} />{item.description}</li>
        ))}
      </ul>
    </main>
  );
}

export default ListMaterial;