"use client";

import { useEffect, useState } from 'react';
import { MapPin, Home, Currency } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import axios from 'axios';
import ExpandedApartmentView from './ExpandedApartmentView';

interface Apartment {
  id: string;
  title: string;
  description: string;
  location: string;
  size: number;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
}

interface ApartmentCardProps {
  apartment: Apartment;
  onClick: () => void; 
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment,onClick }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/apartments/${apartment.id}/image`, {
          responseType: 'arraybuffer'
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        console.error('Error fetching image:', err);
        setError('Failed to load image');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [apartment.id]);

  const handleClick = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <Card className="overflow-hidden cursor-pointer" onClick={handleClick}>
        <div className="aspect-w-16 aspect-h-9 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-red-500">{error}</span>
            </div>
          )}
          {imageUrl && (
            <img 
              src={imageUrl}
              alt={apartment.title} 
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{apartment.title}</h2>
          <p className="text-xl font-semibold text-gray-800 mb-2">ID: {apartment.id}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{apartment.description}</p>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">{apartment.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">{apartment.size} sqm</span>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <Currency className="w-5 h-5" aria-hidden="true" />
            <span>{apartment.price} EGP</span>
          </div>
          <Badge variant="secondary">{apartment.type}</Badge>
        </CardFooter>
      </Card>
      <ExpandedApartmentView
        apartment={apartment}
        imageUrl={imageUrl}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  );
};

export default ApartmentCard;
