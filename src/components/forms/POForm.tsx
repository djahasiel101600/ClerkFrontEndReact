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
  po_no: z.string().min(6, { message: "PO No. is required" }),
  po_date: z.date({ required_error: "PO Date is required" }),
  date_received_coa: z.date({ message: "Date Signed by the supplier is required" }),

});

export default function POForm() {
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      po_no: "",
      po_date: new Date(),
      date_received_coa: new Date(),
    },
  });

   
    function onSubmit(values: z.infer<typeof formSchema>) {
      fetch('http://127.0.0.1:8000/api/incoming/po-record/create/', {
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
        form.setValue("date_received_coa", date);
      }
    }
   
    function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
      const currentDate = form.getValues("date_received_coa") || new Date();
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
   
      form.setValue("date_received_coa", newDate);
    }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="po_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Order No.</FormLabel>
                <FormControl>
                  <Input placeholder="PO No." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="po_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
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
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="date_received_coa"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-3">
              <FormLabel>Date Received in COA</FormLabel>
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