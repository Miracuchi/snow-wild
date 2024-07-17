/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/contexts/CartContext";
import { GET_MATERIAL_BY_ID } from "@/requetes/queries/material.queries";
import { Material } from "@/types/material";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MaterialDetail() {
  const router = useRouter();
  // const { id } = router.query;
  const [getAd, { data, loading, error }] = useLazyQuery(GET_MATERIAL_BY_ID);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>();

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

  const material: Material = data?.findMaterialById;
  console.log(material);

  const handleAddToCart = () => {
    if (material && selectedSize) {
      const materialWithSize = { ...material, selectedSize };
      addToCart(materialWithSize, selectedSize);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden">
        <div className="flex-auto w-64 ">
          <img src={material?.picture} alt={material?.name} />
        </div>
        <div className="p-6 flex-auto w-32">
          <h1 className="text-3xl text-neutral-950 font-bold mb-8">
            {material?.name}
          </h1>
          <p className="text-gray ">{material?.description}</p>
          <p className="text-gray w-40">{material?.price}€</p>

          <img src={material?.picture} alt={material?.name} />

          <div className="p-6">
            <p className="text-gray w-40">{material?.description}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-neutral-950 text-white rounded hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/" className="hover:underline">
          Retour à la liste
        </Link>
      </div>
    </main>
  );
}

export default MaterialDetail;
