import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type PageSizeSelectProps = {
  value: number;
  options?: number[];
  onChange: (value: number) => void;
  className?: string;
};

const PageSizeSelect = ({
  value,
  options = [10, 15, 20, 30, 50, 100],
  onChange,
  className = "",
}: PageSizeSelectProps) => {
  return (
    <div className="flex items-center space-x-2 mb-1.5">
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger
          className={`w-16 border-gray-300 px-2 focus:ring-0 ${className}`}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent 
          className="border border-gray-400 shadow-sm overflow-hidden min-w-0"
          style={{ width: '64px' }}
        >
          {options.map((num) => (
            <SelectItem key={num} value={String(num)}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <label className="text-sm font-medium text-gray-600">
        Items per page
      </label>
    </div>
  );
};

export default PageSizeSelect;