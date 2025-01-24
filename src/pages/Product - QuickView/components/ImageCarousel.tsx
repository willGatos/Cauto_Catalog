import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Button } from "./ui/button";

interface ImageCarouselProps {
  images: string[];
  initialLoading?: boolean;
}

export function ImageCarousel({
  images,
  initialLoading = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const loadImage = useCallback((src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = reject;
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadImage(images[currentIndex])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [currentIndex, images, loadImage]);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/80">
          <Loader className="h-8 w-8 animate-spin text-slate-900" />
        </div>
      )}
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
