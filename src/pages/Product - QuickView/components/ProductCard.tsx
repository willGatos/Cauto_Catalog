import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, Variation } from "../types/product";
import { Card, CardContent } from "./ui/card";
import { AttributeSelector } from "./AttributeSelector";
import { ImageCarousel } from "./ImageCarousel";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const currentVariation = useMemo(() => {
    if (Object.keys(selectedAttributes).length === 0) return null;

    return product.product_variations.find((variation) =>
      variation.attribute_values.every(
        (attr) => selectedAttributes[attr.types.name] === attr.value
      )
    );
  }, [product.product_variations, selectedAttributes]);

  useEffect(() => {
    setIsLoadingImages(true);
    if (currentVariation) {
      setSelectedImages(currentVariation.pictures);
    } else {
      setSelectedImages(product.images);
    }
  }, [currentVariation, product.images]);

  const getAvailableValues = (attributeName: string) => {
    const otherAttributes = Object.entries(selectedAttributes).filter(
      ([name]) => name !== attributeName
    );

    return new Set(
      product.product_variations
        .filter((v) =>
          otherAttributes.every(([attr, value]) =>
            v.attribute_values.some(
              (a) => a.types.name === attr && a.value === value
            )
          )
        )
        .flatMap((v) => v.attribute_values)
        .filter((a) => a.types.name === attributeName)
        .map((a) => a.value)
    );
  };

  const handleAttributeClick = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => {
      const newAttributes = { ...prev };
      if (newAttributes[attributeName] === value) {
        delete newAttributes[attributeName];
      } else {
        newAttributes[attributeName] = value;
      }
      return newAttributes;
    });
  };

  useEffect(() => {
    const sharedVariationId = searchParams.get("variation");
    if (sharedVariationId) {
      const variation = product.product_variations.find(
        (v) => v.id.toString() === sharedVariationId
      );
      if (variation) {
        const attributes = variation.attribute_values.reduce((acc, attr) => {
          acc[attr.types.name] = attr.value;
          return acc;
        }, {} as { [key: string]: string });
        setSelectedAttributes(attributes);
      }
    }
  }, [searchParams, product.product_variations]);

  const allAttributesSelected =
    Object.keys(selectedAttributes).length === product.attributes.length;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
          </div>

          <div>
            {selectedImages.length > 0 ? (
              <ImageCarousel
                images={selectedImages}
                initialLoading={isLoadingImages}
              />
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center rounded-md">
                <p className="text-muted-foreground">
                  Seleccione todos los atributos para ver la imagen
                </p>
              </div>
            )}
            {currentVariation && (
              <div className="mt-6 mb-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1">
                  <span className="text-2xl font-bold text-green-600">
                    {currentVariation.price.toFixed(2)} USD
                  </span>
                </div>
              </div>
            )}
          </div>

          {product.attributes.map((attribute) => (
            <div key={attribute.id} className="space-y-2">
              <h3 className="text-sm font-medium text-slate-900">
                {attribute.name}: {selectedAttributes[attribute.name]}
              </h3>
              <AttributeSelector
                variations={product.product_variations}
                attribute={attribute}
                selectedValue={selectedAttributes[attribute.name]}
                onAttributeClick={handleAttributeClick}
                availableValues={getAvailableValues(attribute.name)}
                selectedAttributes={selectedAttributes}
              />
              {!selectedAttributes[attribute.name] && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Por favor seleccione un valor para {attribute.name}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ))}
          {product.description && (
            <Collapsible
              open={isDescriptionOpen}
              onOpenChange={setIsDescriptionOpen}
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
                <h3 className="text-lg font-medium">Descripción</h3>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDescriptionOpen ? "transform rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-sm text-slate-600">
                {product.description}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
