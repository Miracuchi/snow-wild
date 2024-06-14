"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Step, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const steps = [
  { label: "Step 1", description: "Description 1" },
  { label: "Step 2", description: "Description 2" },
  { label: "Step 3", description: "Description 3" },
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
  // const [formState, setFormState] = useState({});
  const actualDate = new Date(Date.now());

  const [formState, setFormState] = useState<{
    start_date: Date | null;
    end_date: Date | null;
  }>({
    start_date: actualDate,
    end_date: new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate() + 1
    ),
    // materials: []
  });
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm
                  formState={formState}
                  setFormState={setFormState}
                />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SecondStepForm />
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

const FirstFormSchema = z.object({
  date: z
    .date({
      required_error: "La date est requise.",
      invalid_type_error: "Ce champ doit être une date.",
    })
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "La date doit être valide.",
    }),
});

function FirstStepForm({
  formState,
  setFormState,
}: {
  formState: { start_date: Date | null; end_date: Date | null };
  setFormState: React.Dispatch<
    React.SetStateAction<{ start_date: Date | null; end_date: Date | null }>
  >;
}) {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(_data: z.infer<typeof FirstFormSchema>) {
    nextStep();
    toast({
      title: "First step submitted!",
    });
  }
  const actualDate = new Date(Date.now());
  const [formInfos, setFormInfos] = useState({
    start_date: actualDate,
    end_date: new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate() + 1
    ),
    // materials: []
  });

  const LOCAL_STORAGE_KEY = "stepperFormDates";

  const saveDatesToLocalStorage = (dates: {
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dates));
  };

  const getDatesFromLocalStorage = () => {
    const dates = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (dates) {
      const parsedDates = JSON.parse(dates);
      return {
        start_date: parsedDates.start_date
          ? new Date(parsedDates.start_date)
          : null,
        end_date: parsedDates.end_date ? new Date(parsedDates.end_date) : null,
      };
    }
    return { start_date: null, end_date: null };
  };

  useEffect(() => {
    if (formInfos) saveDatesToLocalStorage(formInfos);
  }, [formInfos]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          // control={form.control}
          name="date"
          render={() => (
            <FormItem>
              <FormLabel>Dates</FormLabel>
              <FormControl>
                <div className="flex mx-10 justify-center h-20">
                  <div className="datePickerContainer h-20 flex-row">
                    <>
                      <DatePicker
                        selected={formInfos.start_date}
                        onChange={(date) => {
                          if (date) {
                            setFormInfos({ ...formInfos, start_date: date });
                          }
                        }}
                        selectsStart
                        startDate={formInfos.start_date}
                        endDate={formInfos.end_date}
                      />
                      <DatePicker
                        selected={formInfos.end_date}
                        onChange={(date) => {
                          console.log(date);
                          if (date) {
                            setFormInfos({ ...formInfos, end_date: date });
                          }
                        }}
                        selectsEnd
                        startDate={formInfos.start_date}
                        endDate={formInfos.end_date}
                        minDate={formInfos.start_date}
                      />
                    </>
                  </div>
                  <span id="divider" />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

const SecondFormSchema = z.object({
  card: z.string().min(8, {
    message: "Le numéro de carte doit comporter au moins 8 caractères.",
  }),
  expirationDate: z.date({
    message: "La date de validité n'est pas valide.",
  }),
  securityCode: z.string().min(3, {
    message: "Le code de sécurité doit comporter au moins 3 caractères.",
  }),
});

function SecondStepForm() {
  interface FormData {
    card?: string;
    expirationDate?: Date | null;
    securityCode?: string;
  }
  const { nextStep } = useStepper();
  const [formData, setFormData] = useState<FormData>({
    card: "",
    expirationDate: null,
    securityCode: "",
  });

  console.log(formData);

  const form = useForm<z.infer<typeof SecondFormSchema>>({
    resolver: zodResolver(SecondFormSchema),
    defaultValues: {
      card: "",
      expirationDate: undefined,
      securityCode: "",
    },
  });

  // const form = useForm<z.infer<typeof FirstFormSchema>>({
  //   resolver: zodResolver(FirstFormSchema),
  //   defaultValues: {
  //     date: new Date(),
  //   },
  // });

  function onSubmit(_data: z.infer<typeof SecondFormSchema>) {
    nextStep();
    toast({
      title: "Second step submitted!",
    });
  }
  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      securityCode: value,
    });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      card: value,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          // control={form.control}
          name="card"
          render={() => (
            <FormItem>
              <FormLabel>N° de carte</FormLabel>
              <FormControl>
                <Input
                  placeholder="123456789"
                  type="text"
                  onInput={handleCardNumberChange}
                  value={formData?.card}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          // control={form.control}
          name="expirationDate"
          render={() => (
            <FormItem>
              <FormLabel>Date de validité</FormLabel>
              <FormControl>
                <DatePicker
                  selected={formData?.expirationDate}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableYearDropdown
                  onChange={(date) => {
                    console.log(date);
                    if (date) {
                      setFormData({ ...formData, expirationDate: date });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          // control={form.control}
          name="securityCode"
          render={() => (
            <FormItem>
              <FormLabel>Code de sécurité</FormLabel>
              <FormControl>
                <Input
                  placeholder="123"
                  type="text"
                  value={formData?.securityCode}
                  onInput={handleSecurityCodeChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" type="button" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
            type="button"
          >
            Prev
          </Button>
          <Button size="sm" type="submit">
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
