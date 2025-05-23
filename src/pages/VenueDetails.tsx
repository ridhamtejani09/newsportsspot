import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useVenues } from '@/contexts/VenuesContext';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Accessibility, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

const VenueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVenueById } = useVenues();
  const { getAvailableTimeSlots, initiateBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  const venue = getVenueById(id || '');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [playerCount, setPlayerCount] = useState(10);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!venue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Venue not found</h2>
            <Button onClick={() => navigate('/book-venue')}>
              Back to Venues
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const timeSlots = getAvailableTimeSlots(venue.id, format(date, 'yyyy-MM-dd'));

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedTimeSlot) return;

    const bookingId = initiateBooking(venue.id, format(date, 'yyyy-MM-dd'), selectedTimeSlot, playerCount);
    navigate(`/payment/${bookingId}`);
  };

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Image Gallery */}
        <div className="relative h-[50vh] md:h-[60vh] bg-gray-900">
          <img 
            src={venue.images[activeImageIndex]} 
            alt={venue.name} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          
          {/* Navigation arrows */}
          <button 
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {venue.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Venue title overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container mx-auto">
              <Badge className="mb-2 bg-blue-600">{venue.sport}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{venue.name}</h1>
              <div className="flex items-center text-white/90 mb-1">
                <MapPin size={16} className="mr-1" />
                <span>{venue.address}</span>
              </div>
              <div className="flex items-center text-amber-400">
                <Star size={18} className="fill-amber-400 mr-1" />
                <span className="font-medium">{venue.rating}</span>
                <span className="text-white/80 ml-2">(32 reviews)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Venue Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">About this venue</h2>
                <p className="text-gray-700 mb-6">{venue.description}</p>
                
                <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Location</h3>
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200 mb-6">
                  {/* Map placeholder - would be replaced with an actual map component */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Map view of {venue.name}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-2" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span>info@{venue.name.toLowerCase().replace(/\s/g, '')}.com</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {/* Sample reviews */}
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="font-medium">AK</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Amit Kumar</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={`${star <= 5 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Great venue with excellent facilities. The turf was in perfect condition and the staff was very helpful.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="font-medium">RJ</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Riya Joshi</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={`${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                            <Star size={14} className="text-gray-300 mr-0.5" />
                          </div>
                          <span className="text-sm text-gray-500 ml-2">1 month ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Good venue overall. The changing rooms could be better, but the playing area is excellent.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <span className="font-medium">VS</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Vikram Singh</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={`${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">2 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Excellent location and very well maintained. The booking process was smooth and hassle-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Book this venue</h3>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      ₹{venue.price}/hr
                    </Badge>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="mb-4">
                    <label className="font-medium mb-2 block">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="border rounded-md"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="font-medium mb-2 block">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                          className={`
                            ${!slot.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                            ${selectedTimeSlot?.id === slot.id ? 'bg-blue-600' : ''}
                          `}
                          disabled={!slot.isAvailable}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock size={14} className="mr-1" />
                          {slot.startTime}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="font-medium mb-2 block">Number of Players</label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                      >
                        -
                      </Button>
                      <span className="mx-4 font-medium">{playerCount}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPlayerCount(playerCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  {selectedTimeSlot && (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Hourly Rate</span>
                        <span>₹{venue.price}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{venue.price * playerCount}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!selectedTimeSlot}
                    onClick={handleBooking}
                  >
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    No payment is required until you confirm your booking.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VenueDetails;