import { DATES_STORAGE_KEY } from "@/constants";
import { SetToLocalStorage } from "@/hooks/useLocalStorage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";

import { useDate } from "@/contexts/DateContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CartWithoutActions from "../cart/CartWithoutActions";

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
export interface DateFormInfos {
  start_date: Date;
  end_date: Date;
}
function ReservationDateStep({
  handleSubmit,
}: {
  handleSubmit: () => Promise<void>;
}) {
  const { formInfos, setFormInfos } = useDate();

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

  return (
    <>
      <Form {...form}>
        <form className="space-y-6 ">
          <FormField
            control={form.control}
            name="date"
            render={() => (
              <FormItem>
                <FormLabel className="text-3xl  text-neutral-950 font-bold ml-3 mb-10">
                  Mes dates de location
                </FormLabel>
                <FormControl className="mt-4">
                  <div className="flex justify-center h-20 ">
                    <div className="datePickerContainer bg-blue-300 rounded-lg shadow-lg h-20 flex items-center justify-evenly w-full max-w-4xl">
                      <>
                        <span>Du</span>
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
                          placeholderText="Date de début"
                          className="  rounded-lg border-2  border-black py-2 text-center mx-2"
                        />
                        <span>au</span>
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
                          placeholderText="Date de fin"
                          className="  rounded-lg border-2 border-black py-2 text-center mx-2"
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
        </form>
      </Form>
      <CartWithoutActions handleSubmit={handleSubmit} />
    </>
  );
}

export default ReservationDateStep;
