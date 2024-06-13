import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries";
import { Category, CategoryQuery } from "@/types/category";



const Categories: React.FC = () => {
  // Récupération des données à l'aide de useQuery
  const { data, loading, error } = useQuery<CategoryQuery>(LIST_CATEGORIES);
  console.log(data)


  return (
    <div>
      <h1>Liste des catégories</h1>
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