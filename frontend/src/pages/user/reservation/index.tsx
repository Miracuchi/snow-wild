"use client";
import { Step, Stepper } from "@/components/stepper";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import ReservationDateStep from "./ReservationDateStep";
import ReservationPaiementStep from "./ReservationPaiementStep";

const steps = [
  { label: "Step 1", description: "Choix des dates" },
  { label: "Step 2", description: "Paiement" },
];

export default function StepperForm() {
  const router = useRouter();
  const { step } = router.query; // Récupère les query params
  const initialStep = step === "2" ? 1 : 0; // Si step=2, démarre à l'étape 2
  return (
    <div className="flex w-full flex-col gap-4 mt-8">
      <Stepper variant="circle-alt" initialStep={initialStep} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ReservationDateStep />
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
