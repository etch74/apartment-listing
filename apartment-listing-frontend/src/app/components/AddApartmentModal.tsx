"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, X, Home, MapPin, DollarSign, Maximize, Bed, Bath } from 'lucide-react'
import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'

interface AddApartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (apartment: any) => void
}

const AddApartmentModal: React.FC<AddApartmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('') // Added type state
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append all fields to FormData
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('size', size);
      formData.append('type', type);
      formData.append('bedrooms', bedrooms);
      formData.append('bathrooms', bathrooms);
  
      // Append the image file (if exists)
      if (image) {
        formData.append('image', image);
      }
  
      // Send the data to the server
      const response = await axios.post('http://localhost:5000/api/apartments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Call the parent onSubmit with the response
      onSubmit(response.data);
  
      // Reset form and close modal
      resetForm();
      onClose();
  
      // Show success message
      toast({
        title: 'Success',
        description: 'Apartment added successfully',
      });
    } catch (error) {
      console.error('Error adding apartment:', error);
      } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLocation('')
    setPrice('')
    setSize('')
    setType('')
    setBathrooms('')
    setBedrooms('')
    setImage(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Apartment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter apartment title"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter apartment description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter apartment location"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (EGP)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size (sqm)</Label>
              <div className="relative">
                <Maximize className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Enter size"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="bedrooms"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="Number of bedrooms"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="bathrooms"
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="Number of bathrooms"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {image ? 'Change Image' : 'Upload Image'}
              </Button>
              {image && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {image && <p className="text-sm text-muted-foreground mt-1">{image.name}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Apartment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddApartmentModal

