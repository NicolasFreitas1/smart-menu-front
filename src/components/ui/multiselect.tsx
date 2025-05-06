import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  options: string[];
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  placeholder = "Selecione ou crie uma categoria",
  options,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addItem = (item: string) => {
    const trimmed = item.trim();
    if (trimmed.length === 0 || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeItem = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed.length > 0) {
        addItem(trimmed);
      }
    }
  };

  const filteredOptions = options.filter((opt) => !value.includes(opt));

  return (
    <div
      className={cn(
        "w-full border rounded-xl p-2 focus-within:ring-2 ring-primary",
        className
      )}
    >
      <div className="flex flex-wrap gap-2 mb-1">
        {value.map((item) => (
          <span
            key={item}
            className="bg-primary text-white rounded-full px-3 py-1 text-sm flex items-center gap-1"
          >
            {item}
            <button onClick={() => removeItem(item)} type="button">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm"
        list="multi-select-datalist"
      />
      <datalist id="multi-select-datalist">
        {filteredOptions.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </div>
  );
};
