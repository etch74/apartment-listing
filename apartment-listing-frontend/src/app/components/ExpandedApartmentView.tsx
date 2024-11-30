"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Home, Currency, Bed, Bath } from 'lucide-react'

interface Apartment {
  id: string;
  title: string;
  description: string;
  location: string;
  size: number;
  price: number;
  type: string;
  bedrooms:number;
  bathrooms:number
}

interface ExpandedApartmentViewProps {
  apartment: Apartment;
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExpandedApartmentView: React.FC<ExpandedApartmentViewProps> = ({ apartment, imageUrl, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{apartment.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {imageUrl ? (
              <img src={imageUrl} alt={apartment.title} className="w-full h-auto rounded-lg" />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">{apartment.description}</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span>{apartment.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Home className="w-5 h-5 text-gray-500" aria-hidden="true" />
                <span>{apartment.size} sqm</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed className="w-5 h-5 text-gray-500" aria-hidden="true" />
                <span>{apartment.bedrooms} bed</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-5 h-5 text-gray-500" aria-hidden="true" />
                <span>{apartment.bathrooms} bath</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-2xl font-bold text-green-600">
              <Currency className="w-6 h-6" aria-hidden="true" />
              <span>{apartment.price} EGP</span>
            </div>
            <div>
              <span className="font-semibold">Type: </span>
              <span>{apartment.type}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedApartmentView;

