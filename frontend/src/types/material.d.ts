import { Category } from "./category";

export interface Material {
    imageUrl: string | undefined;
    name: String!;
    picture: String!;
    id: String!;
    description: String!;
    category: Category;
}

export interface MaterialQuery {
    listMaterials: Material[];
}

