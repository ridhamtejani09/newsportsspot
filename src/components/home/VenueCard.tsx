import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { Venue } from '@/contexts/VenuesContext';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <Link to={`/venue/${venue.id}`} className="block group">
      <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={venue.images[0]} 
            alt={venue.name} 
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white text-blue-600 font-medium">
              ₹{venue.price}/hr
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
            <h3 className="text-white font-bold text-xl">{venue.name}</h3>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{venue.city}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {venue.sport}
            </Badge>
            <div className="flex items-center text-amber-500">
              <Star size={16} className="fill-amber-500 mr-1" />
              <span className="font-medium">{venue.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">
            {venue.description}
          </p>
        </CardContent>
        <CardFooter className="flex-wrap gap-2 p-4 pt-0 border-t border-gray-100">
          {venue.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
              {amenity}
            </Badge>
          ))}
          {venue.amenities.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
              +{venue.amenities.length - 3} more
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VenueCard;