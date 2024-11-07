import AuthContext from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useDate } from "@/contexts/DateContext";
import { CREATE_RESERVATION } from "@/requetes/mutations/reservation.mutations";
import { Step, Stepper } from "@/user/components/stepper";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReservationDateStep from "../../../user/components/reservation/ReservationDateStep";
import ReservationPaiementStep from "../../../user/components/reservation/ReservationPaiementStep";
const steps = [
  { label: "Step 1", description: "Choix des dates" },
  { label: "Step 2", description: "Paiement" },
];

export default function UserCreateReservation() {
  const router = useRouter();
  const { step } = router.query; // Récupère les query params
  const initialStep = step === "2" ? 1 : 0; // Si step=2, démarre à l'étape 2
  const { cart } = useCart();
  const { user } = useContext(AuthContext);
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const { formInfos } = useDate();

  const reservationMaterials = cart.map((item) => ({
    materialId: item.id,
    quantity: item.quantity,
    size: item.selectedSize,
  }));

  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);
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
            start_date: formInfos.start_date,
            end_date: formInfos.end_date,
            materials: reservationMaterials,
            user: {
              id: user?.userId,
            },
          },
        },
      });
      console.log("Reservation created successfully:", response.data);
      const reservationId = response.data.createReservation.id;
      localStorage.setItem("reservationId", reservationId);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 mt-8">
      <Stepper variant="circle-alt" initialStep={initialStep} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ReservationDateStep handleSubmit={handleSubmit} />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              {<ReservationPaiementStep />}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
