/* eslint-disable @next/next/no-img-element */
import { GET_MATERIAL_BY_ID } from "@/requetes/queries/material.queries";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MaterialDetail() {
  const router = useRouter();
  // const { id } = router.query;
  const [getAd, { data, loading, error }] = useLazyQuery(GET_MATERIAL_BY_ID);

  useEffect(() => {
    if (router.query.id) {
      getAd({
        variables: {
          findMaterialByIdId: router.query.id,
        },
      });
    }
  }, [getAd, router.query.id]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const material = data?.findMaterialById;
  console.log(material);

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl text-neutral-950 font-bold mb-8">
        {material?.name}
      </h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48">
          <img src={material?.picture} alt={material?.name} />
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
        <Link href="/" className="text-blue-500 hover:underline">
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}

export default MaterialDetail;
