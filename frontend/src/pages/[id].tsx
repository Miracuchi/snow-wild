/* eslint-disable @next/next/no-img-element */
import { GET_MATERIAL_BY_ID } from "@/requetes/queries/material.queries";
import { Material } from "@/types/material";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { Key, useEffect, useState } from "react";

function MaterialDetail() {
  const router = useRouter();

  const [getAd, { data, loading, error }] = useLazyQuery(GET_MATERIAL_BY_ID);
  const { addToCart } = useCart();

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
  console.log('material: ', material);

  const handleAddToCart = () => {
    if (material && selectedSize) {
      const materialWithSize = { ...material, selectedSize, id: router.query.id};
      addToCart(materialWithSize, selectedSize);
    }
  };


  return (
    <main className="container mx-auto px-4 py-8 font-poppins">
      
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden">
        <div className="flex-auto w-64 ">
        
          <img 
            src={material?.picture}
            alt={material?.name}
          />
    <main className="container mx-auto px-4 py-8 font-poppins">
      <div className="bg-white py-5 flex rounded-lg shadow-lg overflow-hidden">
        <div className="flex-auto w-64 flex items-center justify-center">
          <img
            className="max-w-28 object-contain"
            src={material?.picture}
            alt={material?.name}
          />
        </div>

        <div className="p-6 flex-auto w-32">
          <h1 className="text-3xl text-neutral-950 font-bold mb-1">
          <h1 className="text-3xl text-neutral-950 font-bold mb-1">
            {material?.name}
          </h1>
          <p className="text-2xl font-bold text-gray mb-8">{material?.price}€</p>
          <p className="text-gray mb-8">{material?.description}</p>
          <p className="mx-2">Sélectionner une taille</p>
          
          <div className="text-gray flex">
            {material?.sizes?.map((sizeDetail: { size: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
              <div key={index} className="mb-2">
                <button className="button"> 
                  {sizeDetail.size}
                </button>
                <br />
              </div>
            ))}
          </div>
          <p className="text-2xl font-bold text-gray mb-8">
            {material?.price}€
          </p>
          <p className="text-gray mb-8">{material?.description}</p>
          <p className="mx-2">Sélectionner une taille</p>
          <div className="text-gray flex ">
            {material?.sizes?.map(
              (sizeDetail: { size: string; quantity: number }, index: Key) => (
                <div key={index} className="mb-2">
                  <button
                    className={`button px-4 py-2 rounded border ${
                      selectedSize === sizeDetail.size
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-black text-white "
                    }`}
                    onClick={() => setSelectedSize(sizeDetail.size)}
                  >
                    {sizeDetail.size}
                  </button>
                  <br />
                </div>
              )
            )}
          </div>

          <div className="p-6">
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddToCart}
                className="button bg-black text-white"
              >
                Ajouter au panier
              </button>
            </div>
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