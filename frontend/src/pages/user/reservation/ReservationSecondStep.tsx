import { useStepper } from "@/components/stepper";
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
import StepperFormActions from "@/pages/user/reservation/ReservationActions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

function ReservationSecondStep() {
  interface FormData {
    card: string;
    expirationDate: Date;
    securityCode: string;
  }
  const { nextStep } = useStepper();
  const [formData, setFormData] = useState<FormData>({
    card: "",
    expirationDate: new Date(),
    securityCode: "",
  });

  const methods = useForm<z.infer<typeof SecondFormSchema>>({
    resolver: zodResolver(SecondFormSchema),
    values: { ...formData },
  });

  const LOCAL_STORAGE_KEY = "bankData";
  const saveBankDataToLocalStorage = (bankData: FormData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bankData));
  };
  useEffect(() => {
    if (formData) saveBankDataToLocalStorage(formData);
  });

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

  // saveBankDataToLocalStorage(formData)
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={methods.control}
          name="card"
          render={() => (
            <FormItem>
              <FormLabel>N° de carte</FormLabel>
              <FormControl>
                <Input
                  name={"card"}
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
          control={methods.control}
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
                    console.log("expiraton date selected", date);
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
          control={methods.control}
          name="securityCode"
          render={() => (
            <FormItem>
              <FormLabel>Code de sécurité</FormLabel>
              <FormControl>
                <Input
                  name={"securityCode"}
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

export default ReservationSecondStep;
