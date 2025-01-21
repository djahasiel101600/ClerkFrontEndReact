"use client";

import * as React from "react"
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
import { Textarea } from "@/components/ui/textarea";

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
  purpose: z.string({ message: "Purpose is required" }),
  amount: z.number().min(0,{ message: "Amount is required" }),
  sales_invoice_no: z.string({ message: "Sales Invoice No. is required" }),
  date_invoice: z.date({ message: "Date Invoice is required" }),
  date_received: z.date({ message: "Date Received is required" }),
  date_received_officer: z.date({ message: "Date Received is required" }),
  date_acceptance: z.date({ message: "Date Acceptance is required" }),
  date_inspection: z.date({ message: "Date Inspection is required" }),
  agency: z.string({ message: "Agency is required" }),
  delay_duration: z.number({ message: "Delay Duration is required" }),
  remarks: z.string().optional(),
});

export function IARForm() {
  // 1. Define your form.
  const [date, setDate] = React.useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iar_no: "",
      iar_date: new Date(),
      supplier: "",
      particulars: "",
      purpose: "",
      amount: 0,
      sales_invoice_no: "",
      date_invoice: new Date(),
      date_received_officer: new Date(),
      date_acceptance: new Date(),
      date_inspection: new Date(),
      date_received: new Date(),
      agency: "",
      delay_duration: 0,
      remarks: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    fetch('http://127.0.0.1:8000/api/incoming/iar-record/create/', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <div className="container mx-auto p-4 space-y-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space">
        <div className="grid grid-cols-5 gap-4">
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
                  Inspection & Acceptance Report No.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iar_date"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2 m-0">
                <FormLabel>IAR Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Inspection and Acceptance Report Date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        


    
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Input placeholder="Supplier Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="particulars"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Particulars</FormLabel>
              <FormControl>
              <Textarea
                  placeholder="Particulars.."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
              <Textarea
                  placeholder="Purpose of the transaction.."
                  className="resize-none"
                  {...field}
                />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

        </div>
  

        <div className="grid grid-cols-2 gap-4">
          
          <FormField
            control={form.control}
            name="sales_invoice_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Invoice No.</FormLabel>
                <FormControl>
                  <Input placeholder="Sales Invoice No." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField
          control={form.control}
          name="date_invoice"
          render={({ field }) => (
            <FormItem className="flex flex-col pt-3">
              <FormLabel>Date of Invoice</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Invoice Date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                  type="number"
                  placeholder="Amount"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="agency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office/Agency</FormLabel>
              <FormControl>
                <Input placeholder="Office/Agency.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  

        <div className="grid grid-cols-5 gap-3 mt-3">
        <FormField
          control={form.control}
          name="date_received_officer"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Received (Supply Officer)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_acceptance"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Acceptance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_inspection"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Inspection</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="date_received"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-3">
              <FormLabel>Date Received (COA Office)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3">Submit</Button>
      </form>
    </Form>
    </div>
  );
}

export default function CustomForm() {
  return <IARForm />;
}
