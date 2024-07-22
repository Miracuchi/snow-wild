import { useStepper } from "@/components/stepper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { DATES_STORAGE_KEY } from "@/constants";
import { SetToLocalStorage } from "@/hooks/useLocalStorage";
import StepperFormActions from "@/pages/user/reservation/ReservationActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
export interface FormInfos {
  start_date: Date;
  end_date: Date;
}
function ReservationFirstStep() {
  const { nextStep } = useStepper();
  const actualDate = new Date(Date.now());
  const [formInfos, setFormInfos] = useState<FormInfos>({
    start_date: actualDate,
    end_date: new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate() + 1
    ),
  });
  useEffect(() => {
    if (formInfos) {
      SetToLocalStorage(DATES_STORAGE_KEY, formInfos);
    }
  }, [formInfos]);

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
                          console.log("date selected:", date);
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

export default ReservationFirstStep;
