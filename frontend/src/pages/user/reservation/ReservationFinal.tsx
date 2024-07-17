"use client";
import { useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CREATE_RESERVATION } from "@/requetes/mutations/reservation.mutations";
import { useMutation } from "@apollo/client";
export default function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  const { cart, formInfos } = useLocalStorage();

  const [createReservation, { data, loading, error }] =
    useMutation(CREATE_RESERVATION);

  console.log("DATA RES FINAL", data);

  console.log("CART FINAL", cart);

  const cartInfo = cart.map((c) => ({
    name: c.name,
    description: c.description,
    price: c.price,
    quantity: c.quantity,
  }));

  const handleSubmit = async () => {
    const response = await createReservation({
      variables: {
        info: {
          start_date: formInfos.start_date,
          end_date: formInfos.end_date,
        },
      },
    });
  };

  if (activeStep !== steps.length) {
    return null;
  }

  console.log(" IN FINAL", cart, formInfos);
  const name = cart.map((c) => c.description);

  return (
    <>
      <div>{name}</div>
      <div>{formInfos.start_date.toDateString()}</div>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={resetSteps}>Finaliser la réservation</Button>
        <Button onClick={resetSteps}>Abandonner</Button>
      </div>
    </>
  );
}
