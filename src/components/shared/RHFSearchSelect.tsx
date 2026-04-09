"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/src/lib/utils"; // Ensure you have this utility
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Label } from "../ui/label";

type RHFSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  rules?: Record<string, any>;
  onChange?: (value: string) => void;
};

export default function RHFSearchSelect({
  name,
  label,
  placeholder = "Select option...",
  options,
  defaultValue,
  rules,
  onChange,
}: RHFSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const error = errors[name]?.message as string;

  return (
    <div className="flex flex-col gap-2 flex-1 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={rules}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={triggerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full flex-1 justify-between bg-white font-normal",
                  error ? "border-red-500" : "border-gray-400",
                )}
              >
                {field.value
                  ? options.find((opt) => opt.value === field.value)?.label
                  : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: width ? `${width}px` : "auto" }}
              className="p-0 bg-white"
              align="start"
            >
              <Command>
                <CommandInput
                  placeholder={`Search ${label?.toLowerCase()}...`}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.label} // Command searches by this value
                        onSelect={() => {
                          const newValue =
                            opt.value === field.value ? "" : opt.value;
                          field.onChange(newValue);
                          onChange?.(newValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === opt.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
