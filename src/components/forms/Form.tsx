"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// # IAR Fields:
// # IAR No.
// # IAR Date
// # Supplier
// # Particulars
// # Amount
// # Date Received (COA OFfice)
// # Delay Duration
// # DateTime Created
// # DateTime Updated
// # Remarks

const formSchema = z.object({
  iar_no: z.string().min(6, { message: "IAR No. is required" }),
  iar_date: z.date({ required_error: "IAR Date is required" }),
  supplier: z.string({ message: "Supplier is required" }),
  particulars: z.string({ message: "Particulars is required" }),
  amount: z.number({ message: "Amount is required" }),
  date_received: z.date({ message: "Date Received is required" }),
  delay_duration: z.number({ message: "Delay Duration is required" }),
  remarks: z.string().optional(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iar_no: "",
      iar_date: new Date(),
      supplier: "",
      particulars: "",
      amount: 0,
      date_received: new Date(),
      delay_duration: 0,
      remarks: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="iar_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IAR Number</FormLabel>
              <FormControl>
                <Input placeholder="0000-00-0000" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function CustomForm() {
  return <ProfileForm />;
}
