// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/components/ui/select";
// import { useFormContext, Controller } from "react-hook-form";
// import { Label } from "../ui/label";

// type RHFSelectProps = {
//   name: string;
//   label: string;
//   placeholder?: string;
//   options: { label: string; value: string }[];
//   defaultValue?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   rules?: Record<string, any>;
// };

// export default function RHFSelect({
//   name,
//   label,
//   placeholder,
//   options,
//   defaultValue,
//   rules,
// }: RHFSelectProps) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const error = errors[name]?.message as string;

//   return (
//     <div className="flex flex-col gap-2 flex-1 w-full">
//       <Label htmlFor={name}>{label}</Label>
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         defaultValue={defaultValue || ""} // set default value
//         render={({ field }) => (
//           <Select value={field.value} onValueChange={field.onChange}>
//             <SelectTrigger
//               className={`w-full bg-white border ${
//                 error ? "border-red-500" : "border-gray-400"
//               }`}
//             >
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent
//               className={`bg-white border ${
//                 error ? "border-red-500" : "border-gray-400"
//               }`}
//             >
//               {options.map((opt) => (
//                 <SelectItem key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       />
//       {error && <span className="text-sm text-red-500">{error}</span>}
//     </div>
//   );
// }


"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "../ui/label";

type RHFSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  rules?: Record<string, any>;
  onChange?: (value: string) => void; // NEW
};

export default function RHFSelect({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  rules,
  onChange,
}: RHFSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="flex flex-col gap-2 flex-1 w-full">
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={rules}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);    // update react-hook-form
              onChange?.(value);        // custom handler
            }}
          >
            <SelectTrigger
              className={`w-full bg-white border ${
                error ? "border-red-500" : "border-gray-400"
              }`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
