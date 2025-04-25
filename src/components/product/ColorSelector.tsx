import React from "react";

interface ColorSelectorProps {
  colors: string[]; // array of color values or names
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Colours:</span>
      {colors.map((color) => (
        <label key={color} className="relative cursor-pointer">
          <input
            type="radio"
            name="color"
            value={color}
            checked={selectedColor === color}
            onChange={() => onChange(color)}
            className="sr-only"
          />
          <div
            className={`w-6 h-6 rounded-full border-2 border-black`}
            style={{ backgroundColor: color }}
          >
            {selectedColor === color && (
              <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-white border border-black -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default ColorSelector;

/* {product.colors?.map((color) => (
  <button
    key={color}
    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "ring-2 ring-black" : ""}`}
    style={{ backgroundColor: color }}
    onClick={() => setSelectedColor(color)}
  />
))}
 */
