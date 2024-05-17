import { GET_MATERIAL } from "@/requetes/queries/material.queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { MaterialQuery } from "@/types/material";
import Link from "next/link";

function MaterialDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery<MaterialQuery>(GET_MATERIAL, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const material = data?.material;

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl text-neutral-950 font-bold mb-8">{material?.name}</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48">
          <img src={material?.picture} alt={material?.name} layout="fill" objectFit="cover" />
        </div>
        <div className="p-6">
          <p className="text-gray">{material?.description}</p>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-neutral-950 text-white rounded hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/">
          <a className="text-blue-500 hover:underline">Retour à la liste</a>
        </Link>
      </div>
    </main>
  );
}

export default MaterialDetail;
