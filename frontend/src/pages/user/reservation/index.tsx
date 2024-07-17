"use client";
import { Step, Stepper } from "@/components/stepper";
import ReservationFirstStep from "@/pages/user/reservation/ReservationFristStep";
import ReservationSecondStep from "@/pages/user/reservation/ReservationSecondStep";
import "react-datepicker/dist/react-datepicker.css";
import MyStepperFooter from "./ReservationFinal";

const steps = [
  { label: "Step 1", description: "Choix des dates" },
  { label: "Step 2", description: "Données de paiement" },
];
const CART_STORAGE_KEY = "cart";
//REPERE

// mutation Mutation($data: CreateReservationInput!) {
//   createReservation(data: $data) {
//     end_date
//     start_date
//     reservationMaterials {
//       price
//       quantity
//       material {
//         name
//       }
//     }
//   }
// }

// @InputType()
// export class CreateReservationInput {
//   @Field()
//   user: PartialUserInput // Identifiant de l'utilisateur qui effectue la réservation ==> A ENLEVER

//   @Field(() => [ReservationMaterialInput])
//   materials: ReservationMaterialInput[] // Liste des matériels réservés avec leur quantité

//   @Field()
//   start_date: Date

//   @Field()
//   end_date: Date
// }

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

        <MyStepperFooter />
      </Stepper>
    </div>
  );
}
