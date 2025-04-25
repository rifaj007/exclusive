"use client";
import { useState } from "react";
import { ArrowDownIcon, CancelWithBgIcon } from "@/icons";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { adminAddProductFormSchema } from "@/libs/validator";

interface DropdownProps {
  setValue: UseFormSetValue<z.infer<typeof adminAddProductFormSchema>>;
  errors?: FieldErrors<z.infer<typeof adminAddProductFormSchema>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptions: string[];
  options: string[];
}

const SizeDropdown = ({
  setValue,
  setSelectedOptions,
  selectedOptions,
  options,
}: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handling the selection of technology
  const handleOptionSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
      setValue("size", updatedOptions, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setDropdownOpen(false);
  };

  const handleRemoveOption = (option: string) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
    setValue("size", updatedOptions, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="relative">
      <input type="hidden" />
      {/* Dropdown trigger button */}
      <button
        type="button"
        className={`bg-bg-3 py-2 border rounded text-text-3 px-4 flex-between w-full ${
          dropdownOpen ? "border-neutral-800" : "border-border-1"
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Size
        <ArrowDownIcon />
      </button>

      {/* The dropdown */}
      {dropdownOpen && (
        <ul className="absolute bg-white border border-border-1 rounded-lg mt-2 shadow-lg z-20 w-full max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 rounded-md cursor-pointer hover:text-primary-2 hover:bg-secondary-2"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Selected technologies */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="gap-2 px-3 py-1 border rounded-full shadow-sm flex-center bg-secondary-2 border-border-1 text-text-2"
            >
              <span>{option}</span>
              <button type="button" onClick={() => handleRemoveOption(option)}>
                <CancelWithBgIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeDropdown;
