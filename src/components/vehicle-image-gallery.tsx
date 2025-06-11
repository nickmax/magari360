"use client";

import Image from 'next/image';
import { useState } from 'react';
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

  if (!images || images.length === 0) {
    return (
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full bg-muted flex items-center justify-center rounded-lg">
            <Image 
              src="https://placehold.co/800x600.png?text=No+Image+Available" 
              alt="No image available" 
              fill
              style={{objectFit:"cover"}}
              className="rounded-lg"
              data-ai-hint="placeholder image"
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

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden shadow-lg rounded-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full group">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `${vehicleName} - Image ${currentIndex + 1}`}
              fill
              style={{objectFit:"cover"}}
              priority={currentIndex === 0}
              className="transition-opacity duration-300 rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
              data-ai-hint={images[currentIndex].hint || 'car detail'}
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    currentIndex === index ? "bg-primary scale-125" : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative aspect-video rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200",
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
                sizes="100px"
                data-ai-hint={image.hint || 'car thumbnail'}
              />
              {currentIndex === index && <div className="absolute inset-0 bg-primary/30 rounded"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}