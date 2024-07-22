import { Button } from "@/components/ui/button";
import {
  BANK_STORAGE_KEY,
  CART_STORAGE_KEY,
  DATES_STORAGE_KEY,
} from "@/constants";
import { AuthContext } from "@/contexts/authContext";
import { useCart } from "@/contexts/CartContext";
import {
  EmptyLocalStorage,
  GetFromLocalStorage,
} from "@/hooks/useLocalStorage";
import { CREATE_RESERVATION } from "@/requetes/mutations/reservation.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";

function ReservationSecondStep() {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const dateInfos = GetFromLocalStorage(DATES_STORAGE_KEY);
  console.log("DATEINFOS", dateInfos);
  const reservationMaterials = cart.map((item) => ({
    materialId: item.id,
    quantity: item.quantity,
    size: item.selectedSize,
  }));

  const handleSubmit = async () => {
    if (reservationMaterials.length === 0) {
      console.error("Error: No materials to reserve.");
      router.push("/");
      return;
    }

    try {
      const response = await createReservation({
        variables: {
          data: {
            start_date: dateInfos.start_date,
            end_date: dateInfos.end_date,
            materials: reservationMaterials,
            user: {
              id: user?.userId,
            },
          },
        },
      });
      console.log("Reservation created successfully:", response.data);
      EmptyLocalStorage(CART_STORAGE_KEY, BANK_STORAGE_KEY, DATES_STORAGE_KEY);
      setCart([]);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  // if (activeStep !== steps.length) {
  //   return null;
  // }
  const numberOfArticleText = "Nombre d'articles";
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      {/* <div>{name}</div> */}
      {/* <div>{dateInfos.start_date.toDateString()}</div> */}
      <main className="container flex justify-evenly mx-auto px-4 py-8 font-poppins">
        <div>
          <h1 className="text-3xl text-neutral-950 font-bold mb-8">
            Votre panier
          </h1>
          <div className="bg-dark rounded-lg shadow-lg overflow-hidden grid grid-cols-1 gap-4 ">
            {cart.map((item) => (
              <div key={item.id} className="bg-white flex  overflow-hidden">
                caca
                <div className="relative h-48">
                  <img
                    className="m-5 max-w-28 object-contain"
                    src={item.picture}
                    alt={item.name}
                  />
                </div>
                <div className="p-6 flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold mb-2">{item.name}</p>
                    <p className="text-gray-700">{item.price}€</p>
                    <p className="text-gray-700">
                      Taille : {item.selectedSize}
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="mr-2">Quantité : {item.quantity}</span>
                    </div>{" "}
                  </div>{" "}
                  <div className="h-2 bg-black"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white  rounded-lg shadow-lg pb-10 px-4">
            <h2 className="text-2xl font-bold mb-2">Récapitulatif</h2>
            <p className="text-gray-700 mt-7">
              {numberOfArticleText}: {totalItems}
            </p>
            <p className="text-gray-700 mb-20">Total : {totalPrice}€</p>
          </div>
        </div>
      </main>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={handleSubmit}>Finaliser la réservation</Button>
        <Button>Abandonner</Button>
      </div>
    </>
  );
}

export default ReservationSecondStep;
