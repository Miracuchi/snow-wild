/*import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries";
import { Category } from "@/types/category";

function Categories() {
  /**=======================
   * *       RECUPERATION DES DONNEES
   *========================**/

  /*const { data, loading, error } = useQuery<Category>(LIST_CATEGORIES);
   console.log(data)

  return (
    <div>
      <h1>Liste des catégories</h1>
      <div>
        {data?.name.map((c) => (
          <div key={c.id}> id={c.id} name={c.name} </div>
        ))}
      </div>
      
    </div>
  );
}

export default Categories;*/