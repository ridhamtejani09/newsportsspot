import { createContext, useContext, useState } from 'react';
import { useVenues, Venue } from './VenuesContext';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  venueId: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  totalPrice: number;
  paymentMethod: 'online' | 'venue' | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  playerCount: number;
  bookingName: string;
  phoneNumber: string;
}

interface BookingContextType {
  bookings: Booking[];
  currentBooking: Booking | null;
  getAvailableTimeSlots: (venueId: string, date: string) => TimeSlot[];
  initiateBooking: (venueId: string, date: string, timeSlot: TimeSlot, playerCount: number) => string;
  completeBooking: (
    bookingId: string, 
    bookingName: string, 
    phoneNumber: string, 
    paymentMethod: 'online' | 'venue'
  ) => void;
  getBookingById: (id: string) => Booking | undefined;
}

// Generate time slots from 6 AM to 10 PM
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 6; hour < 22; hour++) {
    const startTime = `${hour}:00`;
    const endTime = `${hour + 1}:00`;
    const isAvailable = Math.random() > 0.3; // 70% chance of being available

    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      isAvailable,
    });
  }
  return slots;
};

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  currentBooking: null,
  getAvailableTimeSlots: () => [],
  initiateBooking: () => '',
  completeBooking: () => {},
  getBookingById: () => undefined,
});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const { getVenueById } = useVenues();

  const getAvailableTimeSlots = (venueId: string, date: string) => {
    // Mock implementation - in a real app, we'd fetch from database
    return generateTimeSlots();
  };

  const initiateBooking = (venueId: string, date: string, timeSlot: TimeSlot, playerCount: number): string => {
    const venue = getVenueById(venueId);
    if (!venue) throw new Error('Venue not found');

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      venueId,
      userId: '1', // Mock user ID
      date,
      timeSlot,
      totalPrice: venue.price * playerCount,
      paymentMethod: null,
      status: 'pending',
      playerCount,
      bookingName: '',
      phoneNumber: '',
    };

    setCurrentBooking(booking);
    return booking.id;
  };

  const completeBooking = (
    bookingId: string, 
    bookingName: string, 
    phoneNumber: string, 
    paymentMethod: 'online' | 'venue'
  ) => {
    const booking = currentBooking;
    if (!booking) return;

    const updatedBooking: Booking = {
      ...booking,
      bookingName,
      phoneNumber,
      paymentMethod,
      status: 'confirmed',
    };

    setBookings([...bookings, updatedBooking]);
    setCurrentBooking(null);

    // Save to localStorage for persistence
    const storedBookings = JSON.parse(localStorage.getItem('sportsspot-bookings') || '[]');
    localStorage.setItem('sportsspot-bookings', JSON.stringify([...storedBookings, updatedBooking]));
  };

  const getBookingById = (id: string) => {
    const storedBookings = JSON.parse(localStorage.getItem('sportsspot-bookings') || '[]');
    return [...bookings, ...storedBookings].find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookings, 
        currentBooking, 
        getAvailableTimeSlots, 
        initiateBooking, 
        completeBooking,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};