"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

type RHFRadioGroupProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any>;
};

export default function RHFRadioGroup({
  name,
  label,
  options,
  defaultValue,
  rules,
}: RHFRadioGroupProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex gap-2"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center  space-x-2"
              >
                <RadioGroupItem 
                className={`
                    w-5 h-5 rounded-full border-2 border-teal-700
                  `}
                value={opt.value} 
                id={opt.value} 
                />
                <Label htmlFor={opt.value}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
