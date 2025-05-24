import { createContext, useContext, useState } from 'react';

export interface Venue {
  id: string;
  name: string;
  sport: 'Football' | 'Pickleball' | 'Volleyball' | 'Cricket' | 'Basketball';
  city: string;
  price: number;
  address: string;
  description: string;
  images: string[];
  amenities: string[];
  rating: number;
}

interface VenuesContextType {
  venues: Venue[];
  getVenueById: (id: string) => Venue | undefined;
  filterVenues: (sport?: string, city?: string) => Venue[];
}

const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Classic Sports Arena',
    sport: 'Pickleball',
    city: 'Rajkot',
    price: 1500,
    address: 'Opp Iskon temple Kalawad Road',
    description: 'A premium Pickleball, Box Cricket turf with international standard facilities and floodlights for night games.',
    images: [
      'https://i.imghippo.com/files/lpxM5049Rc.jpg',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    ],
    amenities: ['Changing Rooms', 'Showers', 'Parking', 'Floodlights', 'Refreshments'],
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Dug Out Sports Club',
    sport: 'Pickleball',
    city: 'Rajkot',
    price: 800,
    address: '456 Park Ave, Rajkot, Gujarat',
    description: 'State-of-the-art pickleball courts with professional equipment and coaching available.',
    images: [
      'https://i.imghippo.com/files/ayg3410aso.jpg',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    ],
    amenities: ['Pro Equipment', 'Coaching', 'Parking', 'Refreshments'],
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Infinity Sports Club',
    sport: 'Volleyball',
    city: 'Ahmedabad',
    price: 900,
    address: '789 Beach Rd, Ahmedabad, Gujarat',
    description: 'Indoor and outdoor volleyball courts suitable for both casual play and tournaments.',
    images: [
      'https://i.imghippo.com/files/AXrC1952gE.jpg',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    ],
    amenities: ['Indoor & Outdoor Courts', 'Equipment Rental', 'Changing Rooms', 'Coaching'],
    rating: 4.0,
  },
  {
    id: '4',
    name: 'Core Pickleball',
    sport: 'Pickleball',
    city: 'Rajkot',
    price: 1200,
    address: '101 Stadium Rd, Rajkot, Gujarat',
    description: 'Full-size PickleBall ground with well-maintained pitch and practice nets.',
    images: [
      'https://i.imghippo.com/files/dRD3688s.jpg',
      'https://images.unsplash.com/photo-1505843276871-1b43c1e1e6c4',
      'https://images.unsplash.com/photo-1505843276871-1b43c1e1e6c4',
    ],
    amenities: ['Practice Nets', 'Pavilion', 'Changing Rooms', 'Equipment Rental', 'Floodlights'],
    rating: 4.7,
  },
  {
    id: '5',
    name: 'One 8 Pickleball Arena',
    sport: 'Pickleball',
    city: 'Ahmedabad',
    price: 850,
    address: '202 Sports Complex, Ahmedabad, Gujarat',
    description: 'Professional basketball courts with high-quality flooring and adjustable hoops.',
    images: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
      'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg',
      'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg',
    ],
    amenities: ['Air Conditioning', 'Scoreboards', 'Changing Rooms', 'Refreshments'],
    rating: 4.3,
  },
];

const VenuesContext = createContext<VenuesContextType>({
  venues: [],
  getVenueById: () => undefined,
  filterVenues: () => [],
});

export const useVenues = () => useContext(VenuesContext);

export const VenuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues] = useState<Venue[]>(mockVenues);

  const getVenueById = (id: string) => {
    return venues.find(venue => venue.id === id);
  };

  const filterVenues = (sport?: string, city?: string) => {
    return venues.filter(venue => {
      const matchesSport = !sport || venue.sport === sport;
      const matchesCity = !city || venue.city === city;
      return matchesSport && matchesCity;
    });
  };

  return (
    <VenuesContext.Provider value={{ venues, getVenueById, filterVenues }}>
      {children}
    </VenuesContext.Provider>
  );
};