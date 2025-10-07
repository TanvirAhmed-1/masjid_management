"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type RHFAsyncSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any>;
};

export default function RHFAsyncSelect({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  rules,
}: RHFAsyncSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 flex-1 w-full overflow-hidden">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue || ""}
        render={({ field }) => {
          const selected = options.find((o) => o.value === field.value);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={`w-full justify-between ${
                    error ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  {selected ? selected.label : placeholder || "Select option"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {open && (
                <PopoverContent className="w-full p-0">
                  <Command>
                    {/* Search box always on top */}
                    <CommandInput
                      placeholder={`Search ${label}...`}
                      className="h-10"
                    />
                    {/* Results with scroll */}
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-50 overflow-y-auto">
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          {opt.label}
                          {field.value === opt.value && (
                            <Check className="ml-auto h-4 w-4 text-teal-700" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
          );
        }}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}


