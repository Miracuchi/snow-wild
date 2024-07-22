"use client";
import { Step, Stepper } from "@/components/stepper";
import ReservationFirstStep from "@/pages/user/reservation/ReservationFristStep";
import ReservationSecondStep from "@/pages/user/reservation/ReservationSecondStep";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  { label: "Step 1", description: "Choix des dates" },
  { label: "Step 2", description: "Données de paiement" },
];

export default function StepperForm() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ReservationFirstStep />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <ReservationSecondStep />
            </Step>
          );
        })}
        {/* Todo : faire le paiement sur stripe dans my stepper form */}
        {/* <MyStepperFooter /> */}
      </Stepper>
    </div>
  );
}
