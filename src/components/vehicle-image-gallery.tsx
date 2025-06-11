"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VehicleImageGalleryProps {
  images: { url: string; alt: string; hint?: string }[];
  vehicleName: string;
}

export function VehicleImageGallery({ images, vehicleName }: VehicleImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!images || images.length === 0) {
    return (
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full bg-muted flex items-center justify-center rounded-lg">
            <Image 
              src="https://placehold.co/800x500.png?text=No+Image" 
              alt="No image available" 
              fill
              style={{objectFit:"cover"}}
              className="rounded-lg"
              data-ai-hint="placeholder no-image"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (!mounted) return null; // Avoid hydration mismatch for client-side state

  return (
    <div className="space-y-3 sm:space-y-4">
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full group"> {/* Standardized aspect ratio */}
            {images.map((image, index) => (
                 <Image
                    key={index}
                    src={image.url}
                    alt={image.alt || `${vehicleName} - Image ${index + 1}`}
                    fill
                    style={{objectFit:"cover"}}
                    priority={index === 0}
                    className={cn(
                        "transition-opacity duration-500 ease-in-out rounded-lg",
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                    data-ai-hint={image.hint || 'car detail'}
                />
            ))}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/90 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 sm:scale-90 group-hover:scale-100 h-8 w-8 sm:h-10 sm:w-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/90 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 sm:scale-90 group-hover:scale-100 h-8 w-8 sm:h-10 sm:w-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </>
            )}
             <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5 sm:space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={cn(
                    "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300",
                    currentIndex === index ? "bg-primary scale-125" : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative aspect-[16/10] rounded-md overflow-hidden border-2 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 transition-all duration-200",
                currentIndex === index ? "border-primary shadow-md scale-105" : "border-transparent hover:border-muted opacity-70 hover:opacity-100"
              )}
              aria-label={`Select image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                style={{objectFit:"cover"}}
                className="rounded"
                sizes="80px sm:100px"
                data-ai-hint={image.hint || 'car thumbnail'}
              />
              {currentIndex === index && <div className="absolute inset-0 bg-primary/20 rounded"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
