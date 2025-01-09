import { Attribute, Variation } from "../types/product";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface AttributeSelectorProps {
  attribute: Attribute;
  selectedValue: string | undefined;
  onAttributeClick: (attributeName: string, value: string) => void;
  availableValues: Set<string>;
  variations: Variation[];
  selectedAttributes: { [key: string]: string };
}

export function AttributeSelector({
  attribute,
  selectedValue,
  onAttributeClick,
  availableValues,
  variations,
  selectedAttributes,
}: AttributeSelectorProps) {
  const getEnabledValues = (attrName: string, attrValue: string) => {
    return variations.some(
      (v) =>
        v.enabled &&
        v.attribute_values.some(
          (av) => av.types.name === attrName && av.value === attrValue
        ) &&
        Object.entries(selectedAttributes).every(
          ([key, value]) =>
            key === attrName ||
            v.attribute_values.some(
              (av) => av.types.name === key && av.value === value
            )
        )
    );
  };

  const uniqueValues = Array.from(
    new Set(attribute.values.map((v) => v.value))
  ).map((value) => {
    return attribute.values.find((v) => v.value === value)!;
  });

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-4">
        {uniqueValues.map((value) => {
          const isAvailable = availableValues.has(value.value);
          const isEnabled = getEnabledValues(attribute.name, value.value);
          const uniqueKey = `${attribute.name}-${value.id}-${value.value}`;

          return (
            <Button
              key={uniqueKey}
              variant={selectedValue === value.value ? "default" : "outline"}
              onClick={() => onAttributeClick(attribute.name, value.value)}
              className={`
                rounded-full px-6 py-2 text-sm
                ${!isAvailable || !isEnabled ? "opacity-50" : ""}
                ${
                  selectedValue === value.value
                    ? "bg-slate-900 text-white"
                    : "text-slate-900"
                }
              `}
              disabled={!isAvailable || !isEnabled}
            >
              {value.value}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
