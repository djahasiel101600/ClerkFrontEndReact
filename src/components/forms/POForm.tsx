"use client";

// import * as React from "react"
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

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";

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

// PO Fields:
// PO No.
// PO Date
// Supplier
// Particulars
// Amount
// Date of Delivery
// Delivery Term
// Date Signed by the Supplier
// Date Received in COA
// Number of Days Delayed
// Agency
// Remarks

const formSchema = z.object({
  po_no: z.string().min(6, { message: "IAR No. is required" }),
  po_date: z.date({ required_error: "IAR Date is required" }),
  supplier: z.string({ message: "Supplier is required" }),
  particulars: z.string({ message: "Particulars is required" }),
  purpose: z.string({ message: "Purpose is required" }),
  amount: z.number().min(0,{ message: "Amount is required" }),
  date_delivery: z.string({ message: "Date Invoice is required" }),
  delivery_term: z.string({ message: "Date Received is required" }),
  date_signed_supplier: z.date({ message: "Date Signed by the supplier is required" }),
  date_received_coa: z.string().datetime({ message: "Date Received in COA is required" }),
  agency: z.string({ message: "Agency is required" }),
  delay_duration: z.number({ message: "Delay Duration is required" }),
  remarks: z.string().optional(),
  time: z.date({message: "Date and Time is required"})
});

export default function POForm() {
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      po_no: "",
      po_date: new Date(),
      supplier: "",
      particulars: "",
      purpose: "",
      amount: 0,
      date_delivery: "",
      delivery_term: "",
      date_received_coa: "",
      date_signed_supplier: new Date(),
      time: new Date(),
      agency: "",
      delay_duration: 0,
      remarks: "none",
    },
  });

   
    function onSubmit(values: z.infer<typeof formSchema>) {
      fetch('http://127.0.0.1:8000/api/incoming/iar-record/', {
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
   
    function handleDateSelect(date: Date | undefined) {
      if (date) {
        form.setValue("time", date);
      }
    }
   
    function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
      const currentDate = form.getValues("time") || new Date();
      let newDate = new Date(currentDate);
   
      if (type === "hour") {
        const hour = parseInt(value, 10);
        newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value, 10));
      } else if (type === "ampm") {
        const hours = newDate.getHours();
        if (value === "AM" && hours >= 12) {
          newDate.setHours(hours - 12);
        } else if (value === "PM" && hours < 12) {
          newDate.setHours(hours + 12);
        }
      }
   
      form.setValue("time", newDate);
    }
  // 2. Define a submit handler.

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Form {...form}>
      <form onSubmit={()=> {form.handleSubmit(onSubmit)}} className="space">
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="po_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PO Number</FormLabel>
                <FormControl>
                  <Input placeholder="0000-00-0000" {...field} />
                </FormControl>
                <FormDescription>
                  Purchase Order No.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="po_date"
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
                          format(field.value, "yyyy-MM-dd")
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
                  placeholder="Purpose.."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
  

        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="date_delivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Delivery</FormLabel>
              <FormControl>
                <Input placeholder="Date of Delivery" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
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
  

        <div className="grid grid-cols-4 gap-3 mt-3">
        <FormField
          control={form.control}
          name="delivery_term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Term</FormLabel>
              <FormControl>
                <Input placeholder="Delivery Term" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </div>
        
 
        <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Enter your date & time (12h)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MM/dd/yyyy hh:mm aa")
                              ) : (
                                <span>MM/DD/YYYY hh:mm aa</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <div className="sm:flex">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={handleDateSelect}
                              initialFocus
                            />
                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                              <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                  {Array.from({ length: 12 }, (_, i) => i + 1)
                                    .reverse()
                                    .map((hour) => (
                                      <Button
                                        key={hour}
                                        size="icon"
                                        variant={
                                          field.value &&
                                          field.value.getHours() % 12 === hour % 12
                                            ? "default"
                                            : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                          handleTimeChange("hour", hour.toString())
                                        }
                                      >
                                        {hour}
                                      </Button>
                                    ))}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                              <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                  {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                    (minute) => (
                                      <Button
                                        key={minute}
                                        size="icon"
                                        variant={
                                          field.value &&
                                          field.value.getMinutes() === minute
                                            ? "default"
                                            : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                          handleTimeChange("minute", minute.toString())
                                        }
                                      >
                                        {minute.toString().padStart(2, "0")}
                                      </Button>
                                    )
                                  )}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                              <ScrollArea className="">
                                <div className="flex sm:flex-col p-2">
                                  {["AM", "PM"].map((ampm) => (
                                    <Button
                                      key={ampm}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        ((ampm === "AM" &&
                                          field.value.getHours() < 12) ||
                                          (ampm === "PM" &&
                                            field.value.getHours() >= 12))
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() => handleTimeChange("ampm", ampm)}
                                    >
                                      {ampm}
                                    </Button>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select your preferred date and time.
                      </FormDescription>
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