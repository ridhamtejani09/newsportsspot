import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

const ManageVenue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addVenue } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    city: '',
    price: '',
    address: '',
    description: '',
    images: [''],
    amenities: [''],
    status: 'active' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sport || !formData.city || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addVenue({
        ...formData,
        price: parseInt(formData.price),
        images: formData.images.filter(Boolean),
        amenities: formData.amenities.filter(Boolean),
      });

      toast({
        title: "Venue added successfully",
        description: "The new venue has been added to the system.",
      });

      navigate('/admin');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add venue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Venue</h1>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Venue Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sport">Sport</Label>
                <Select
                  value={formData.sport}
                  onValueChange={(value) => setFormData({ ...formData, sport: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Pickleball">Pickleball</SelectItem>
                    <SelectItem value="Volleyball">Volleyball</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price per Hour (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter venue description"
                  rows={4}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label>Images (URLs)</Label>
                {formData.images.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                      placeholder="Enter image URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData({ ...formData, images: newImages });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                >
                  Add Image URL
                </Button>
              </div>

              <div className="md:col-span-2">
                <Label>Amenities</Label>
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={amenity}
                      onChange={(e) => {
                        const newAmenities = [...formData.amenities];
                        newAmenities[index] = e.target.value;
                        setFormData({ ...formData, amenities: newAmenities });
                      }}
                      placeholder="Enter amenity"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newAmenities = formData.amenities.filter((_, i) => i !== index);
                        setFormData({ ...formData, amenities: newAmenities });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, amenities: [...formData.amenities, ''] })}
                >
                  Add Amenity
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Venue...' : 'Add Venue'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageVenue;