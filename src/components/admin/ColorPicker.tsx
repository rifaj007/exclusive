"use client";
import { adminAddProductFormSchema } from "@/libs/validator";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

const ColorPicker = ({
  selectedColors,
  setSelectedColors,
  setValue,
  trigger,
}: {
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  setValue: UseFormSetValue<z.infer<typeof adminAddProductFormSchema>>;
  trigger: (field: keyof z.infer<typeof adminAddProductFormSchema>) => void;
}) => {
  const [color, setColor] = useState("#000000");

  const addColor = () => {
    if (!selectedColors.includes(color)) {
      const newColors = [...selectedColors, color];
      setSelectedColors(newColors);
      setValue("colors", newColors);
      trigger("colors");
    }
  };

  const removeColor = (col: string) => {
    const newColors = selectedColors.filter((c) => c !== col);
    setSelectedColors(newColors);
    setValue("colors", newColors);
    trigger("colors");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <input
          type="color"
          value={color}
          className="w-full h-10"
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          type="button"
          onClick={addColor}
          className="button-primary px-2 py-1 text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedColors.map((col) => (
          <div
            key={col}
            className="w-8 h-8 rounded-full border relative"
            style={{ backgroundColor: col }}
          >
            <button
              type="button"
              className="absolute -top-1 -right-1 bg-white text-xs px-1 rounded-full"
              onClick={() => removeColor(col)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
