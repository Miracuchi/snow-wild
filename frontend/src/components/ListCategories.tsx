import { useQuery, useLazyQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries";
import { LIST_MATERIAL_BY_CATEGORY_ID } from "@/requetes/queries/material.queries";
import { Category, CategoryQuery } from "@/types/category";
import { MaterialQuery } from "@/types/material";
import { useState } from "react";

const Categories: React.FC = () => {
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery<CategoryQuery>(LIST_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
console.log(categoriesData)
  const [getMaterials, { data: materialsData, loading: materialsLoading, error: materialsError }] = useLazyQuery<MaterialQuery>(LIST_MATERIAL_BY_CATEGORY_ID);
console.log(materialsData)
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    getMaterials({ variables: { findMaterialByCategoriesId: categoryId } });
  };

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Liste des catégories</h1>
    <div className="flex space-x-4 mb-6">
      {categoriesData?.categories.map((c) => (
        <button
          key={c.id}
          onClick={() => handleCategoryClick(c.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {c.name}
        </button>
      ))}
    </div>

    {materialsLoading && <p className="text-gray-500">Chargement des articles...</p>}
    {materialsError && <p className="text-red-500">Erreur lors du chargement des articles.</p>}

    {materialsData && (
      <div>
        <h2 className="text-xl font-bold mb-4">Articles de la catégorie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {materialsData.findMaterialByCategories.map((material) => (
            <div key={material.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={material.picture} alt={material.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{material.name}</h3>
              <p className="text-gray-700">{material.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default Categories;