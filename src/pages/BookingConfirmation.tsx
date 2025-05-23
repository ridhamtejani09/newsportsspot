import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useVenues } from '@/contexts/VenuesContext';
import { useBooking } from '@/contexts/BookingContext';
import { Calendar, Clock, Users, MapPin, Check, Download, Share2 } from 'lucide-react';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById } = useBooking();
  const { getVenueById } = useVenues();

  const booking = getBookingById(id || '');
  const venue = booking ? getVenueById(booking.venueId) : null;

  useEffect(() => {
    if (!booking || !venue) {
      navigate('/book-venue');
    }
  }, [booking, venue, navigate]);

  if (!booking || !venue) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start mb-6">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <Check className="text-green-600 h-6 w-6" />
              </div>
              <div>
                <h2 className="text-green-800 font-semibold text-lg">Booking Confirmed!</h2>
                <p className="text-green-700">
                  Your booking has been successfully confirmed. You will receive a confirmation SMS shortly.
                </p>
              </div>
            </div>

            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">Booking Details</h1>
                  <Badge className={booking.paymentMethod === 'online' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                    {booking.paymentMethod === 'online' ? 'Paid Online' : 'Pay at Venue'}
                  </Badge>
                </div>

                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Venue Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex mb-4">
                        <img 
                          src={venue.images[0]} 
                          alt={venue.name} 
                          className="w-24 h-24 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{venue.name}</h4>
                          <Badge variant="outline" className="mt-1 mb-2">{venue.sport}</Badge>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin size={14} className="mr-1" />
                            <span>{venue.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Calendar size={14} className="text-gray-500 mr-2" />
                          <span>{format(new Date(booking.date), 'dd MMM yyyy')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="text-gray-500 mr-2" />
                          <span>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="text-gray-500 mr-2" />
                          <span>{booking.playerCount} Players</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Customer Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <p className="font-medium">{booking.bookingName}</p>
                        <p className="text-gray-600">{booking.phoneNumber}</p>
                      </div>
                      <h4 className="font-medium mb-2">Booking ID</h4>
                      <div className="bg-white border border-gray-200 rounded-md p-2 mb-4">
                        <p className="font-mono text-sm">{booking.id}</p>
                      </div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-gray-700">
                        {booking.paymentMethod === 'online' ? 
                          'Paid Online (Credit/Debit Card)' : 
                          'Pay at Venue (Cash/Card/UPI)'}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Payment Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span>₹{venue.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Players</span>
                      <span>× {booking.playerCount}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center">
                <Download size={16} className="mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex items-center">
                <Share2 size={16} className="mr-2" />
                Share Booking
              </Button>
              <Link to="/">
                <Button variant="secondary">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;