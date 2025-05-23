import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface AdminContextType {
  isAdmin: boolean;
  venues: AdminVenue[];
  bookings: AdminBooking[];
  addVenue: (venue: Omit<AdminVenue, 'id'>) => void;
  updateVenue: (id: string, venue: Partial<AdminVenue>) => void;
  deleteVenue: (id: string) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
}

export interface AdminVenue {
  id: string;
  name: string;
  sport: string;
  city: string;
  price: number;
  address: string;
  description: string;
  images: string[];
  amenities: string[];
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: string;
}

export interface AdminBooking {
  id: string;
  venueId: string;
  userId: string;
  userName: string;
  date: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  venues: [],
  bookings: [],
  addVenue: () => {},
  updateVenue: () => {},
  deleteVenue: () => {},
  updateBookingStatus: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [venues, setVenues] = useState<AdminVenue[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);

  // Mock admin check - replace with actual admin validation
  const isAdmin = user?.email === 'admin@sportsspot.com';

  const addVenue = (venue: Omit<AdminVenue, 'id'>) => {
    const newVenue: AdminVenue = {
      ...venue,
      id: `venue-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setVenues([...venues, newVenue]);
  };

  const updateVenue = (id: string, venueUpdate: Partial<AdminVenue>) => {
    setVenues(venues.map(venue => 
      venue.id === id ? { ...venue, ...venueUpdate } : venue
    ));
  };

  const deleteVenue = (id: string) => {
    setVenues(venues.filter(venue => venue.id !== id));
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      venues,
      bookings,
      addVenue,
      updateVenue,
      deleteVenue,
      updateBookingStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
};