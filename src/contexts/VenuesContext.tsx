import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

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
  created_at: string;
}

interface VenuesContextType {
  venues: Venue[];
  getVenueById: (id: string) => Venue | undefined;
  filterVenues: (sport?: string, city?: string) => Venue[];
  refreshVenues: () => void;
}

const VenuesContext = createContext<VenuesContextType>({
  venues: [],
  getVenueById: () => undefined,
  filterVenues: () => [],
  refreshVenues: () => {},
});

export const useVenues = () => useContext(VenuesContext);

export const VenuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues, setVenues] = useState<Venue[]>([]);

  const fetchVenues = async () => {
    const { data, error } = await supabase.from('venues').select('*').order('created_at', { ascending: false });
    if (!error && data) setVenues(data as Venue[]);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const getVenueById = (id: string) => venues.find(venue => venue.id === id);
  
  const filterVenues = (sport?: string, city?: string) =>
    venues.filter(venue =>
      (!sport || venue.sport === sport) &&
      (!city || venue.city === city)
    );

  return (
    <VenuesContext.Provider value={{ venues, getVenueById, filterVenues, refreshVenues: fetchVenues }}>
      {children}
    </VenuesContext.Provider>
  );
};