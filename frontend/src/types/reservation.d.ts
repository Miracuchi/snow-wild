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
