import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries";
import { Category, CategoryQuery } from "@/types/category";



const Categories: React.FC = () => {
  // Récupération des données à l'aide de useQuery
  const { data, loading, error } = useQuery<CategoryQuery>(LIST_CATEGORIES);
  console.log(data)


  return (
    <div className="p-6">
   
    <div className="flex space-x-4 mb-6">
      {categoriesData?.categories.map((c) => (
        <button
          key={c.id}
          onClick={() => handleCategoryClick(c.id)}
          className="px-4 py-2 w-48 border border-stone-950 text-black rounded-lg hover:bg-stone-950 hover:text-white transition"
        >
          {c.name}
        </button>
      ))}
    </div>

    {materialsLoading && <p className="text-gray-500">Chargement des articles...</p>}
    {materialsError && <p className="text-red-500">Erreur lors du chargement des articles.</p>}

    {materialsData && (
      <div>
        {data?.categories.map((c) => (
          <div key={c.id}>
             {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
export default Categories;