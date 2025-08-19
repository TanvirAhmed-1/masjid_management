"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

interface RHFDatePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean | string;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({
  label,
  name,
  placeholder = "Select date",
  required = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field }) => {
          const [open, setOpen] = React.useState(false);
          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id={name}
                  className={`w-full justify-between font-normal ${
                    fieldError ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString()
                    : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    field.onChange(date?.toISOString()); // save ISO string to form
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
    </div>
  );
};

export default RHFDatePicker;
