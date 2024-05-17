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

export type MaterialQuery = {
    material: {
      id: string;
      name: string;
      description: string;
      picture: string;
    };
  };