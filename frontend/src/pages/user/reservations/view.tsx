import { AuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { GET_RESERVATIONS_BY_USER_ID } from "@/requetes/queries/reservation.queries";
import {
  Reservation,
  ReservationsByUserIdResponse,
  ReservationsByUserIdVariables,
} from "@/types/reservation";
import { Button } from "@/ui/Button";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";

export enum StatutReservation {
  AWAITING = "en_attente",
  CONFIRMATION = "confirmée",
  PAID = "payée",
  CANCEL = "annulée",
  FINISHED = "terminée",
}
const UserReservations = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const router = useRouter();
  const { data, loading, error } = useQuery<
    ReservationsByUserIdResponse,
    ReservationsByUserIdVariables
  >(GET_RESERVATIONS_BY_USER_ID, {
    variables: { reservationsByUserIdId: user?.userId?.toString() || "" },
    fetchPolicy: "no-cache",
  });
  console.log(data);
  const { cart, setCart } = useCart();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("fr-FR"); // Utilise 'fr-FR' pour un format français
    const formattedTime = date.toLocaleTimeString("fr-FR");
    return `${formattedDate} à ${formattedTime}`;
  };
  const handlePaiement = (reservation: Reservation) => {
    // Rediriger vers /user/reservation avec la query step=2 et reservationId
    setCart([]);
    router.push(`/user/reservations/create?step=2`);
    localStorage.setItem("reservation", JSON.stringify(reservation));
    localStorage.removeItem("cart");
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="m-4 font-bold text-3xl text-center">MES RESERVATIONS</h1>
      {data?.reservationsByUserId.map((reservation, index) => (
        <div
          key={reservation.id}
          className="mb-8 bg-white  rounded-lg shadow-lg border-4 border-blue-300 p-6"
        >
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Reservation n°{index + 1}
            </h2>
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Début : </span>
                {formatDate(reservation.start_date)}
              </p>
              <p>
                <span className="font-semibold">Fin : </span>
                {formatDate(reservation.end_date)}
              </p>
              <p>
                <span className="font-semibold">Status : </span>
                {reservation.status}
              </p>
              <p>
                <span className="font-semibold">ID : </span>
                {reservation.id}
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-4">Matériel(s)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservation.reservationMaterials.map((material) => (
              <div
                key={material.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_URL +
                    material.material.picture
                  }
                  alt={material.material.name}
                  className="w-96 h-32 object-cover rounded mb-4"
                />
                <p className="font-semibold">{material.material.name}</p>
                <p>Prix: ${material.price}</p>
                <p>Quantité: {material.quantity}</p>
                <p>Taille: {material.size}</p>
              </div>
            ))}
          </div>
          {reservation.status === StatutReservation.AWAITING && (
            <Button
              className="mb-2 mx-2 mt-8 bg-neutral-900 text-white rounded-full hover:bg-green-700"
              onClick={() => handlePaiement(reservation)}
            >
              Payer ma réservation
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserReservations;
