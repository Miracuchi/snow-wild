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
import useLocalStorage from "@/hooks/useLocalStorage";
import StepperFormActions from "@/pages/user/reservation/ReservationActions";
import { zodResolver } from "@hookform/resolvers/zod";
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

function ReservationFirstStep() {
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

  const { formInfos, setFormInfos } = useLocalStorage();

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
