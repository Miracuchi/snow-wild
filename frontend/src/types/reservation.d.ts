export interface ReservationInput {
  startDate: String!;
  endDate: String!;
  reservationMaterial: ReservationMaterialInput;
}

interface ReservationMaterialInput {
  material: {
    id: string;
    name: string;
  };
  price: string;
  quantity: string;
  size: string;
}

// Type pour Material
interface Material {
  id: string;
  name: string;
  picture: string;
}

// Type pour ReservationMaterial
interface ReservationMaterial {
  id: string;
  price: number;
  quantity: number;
  size: string;
  material: Material;
}

// Type pour Reservation
interface Reservation {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  reservationMaterials: ReservationMaterial[];
}

// Type pour la réponse de la requête
interface ReservationsByUserIdResponse {
  reservationsByUserId: Reservation[];
}

// Type pour les variables de la requête
interface ReservationsByUserIdVariables {
  reservationsByUserIdId: string;
}
