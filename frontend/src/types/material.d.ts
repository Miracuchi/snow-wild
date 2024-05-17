export interface Material {
    imageUrl: string | undefined;
    name: String!;
    picture: String!;
    id: String!;
    description: String!;  
}

export interface MaterialQuery {
    listMaterials: Material[];
  }