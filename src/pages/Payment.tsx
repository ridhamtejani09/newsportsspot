import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useVenues } from '@/contexts/VenuesContext';
import { useBooking } from '@/contexts/BookingContext';
import { Check, CreditCard, Building, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getVenueById } = useVenues();
  const { currentBooking, completeBooking } = useBooking();

  const [bookingName, setBookingName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'venue'>('online');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!currentBooking) {
    navigate('/book-venue');
    return null;
  }

  const venue = getVenueById(currentBooking.venueId);

  if (!venue) {
    navigate('/book-venue');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingName || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'online') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        toast({
          title: "Error",
          description: "Please fill in all payment details",
          variant: "destructive",
        });
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      completeBooking(currentBooking.id, bookingName, phoneNumber, paymentMethod);
      
      setIsProcessing(false);
      navigate(`/booking-confirmation/${currentBooking.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate(`/venue/${venue.id}`)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to venue
          </Button>

          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Booking form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="bookingName">Full Name</Label>
                            <Input 
                              id="bookingName" 
                              value={bookingName} 
                              onChange={(e) => setBookingName(e.target.value)} 
                              placeholder="Enter your full name" 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input 
                              id="phoneNumber" 
                              value={phoneNumber} 
                              onChange={(e) => setPhoneNumber(e.target.value)} 
                              placeholder="Enter your phone number" 
                              required 
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={(value) => setPaymentMethod(value as 'online' | 'venue')}
                          className="mb-4"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex items-center">
                              <CreditCard size={16} className="mr-2" />
                              Pay Online
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="venue" id="venue" />
                            <Label htmlFor="venue" className="flex items-center">
                              <Building size={16} className="mr-2" />
                              Pay at Venue
                            </Label>
                          </div>
                        </RadioGroup>

                        {paymentMethod === 'online' && (
                          <div className="bg-gray-50 p-4 rounded-md">
                            <Tabs defaultValue="card">
                              <TabsList className="mb-4">
                                <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                                <TabsTrigger value="upi">UPI</TabsTrigger>
                                <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="card">
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input 
                                      id="cardNumber" 
                                      value={cardNumber} 
                                      onChange={(e) => setCardNumber(e.target.value)} 
                                      placeholder="1234 5678 9012 3456" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="expiryDate">Expiry Date</Label>
                                      <Input 
                                        id="expiryDate" 
                                        value={expiryDate} 
                                        onChange={(e) => setExpiryDate(e.target.value)} 
                                        placeholder="MM/YY" 
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="cvv">CVV</Label>
                                      <Input 
                                        id="cvv" 
                                        value={cvv} 
                                        onChange={(e) => setCvv(e.target.value)} 
                                        placeholder="123" 
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                                    <Input 
                                      id="cardholderName" 
                                      value={cardholderName} 
                                      onChange={(e) => setCardholderName(e.target.value)} 
                                      placeholder="Name as on card" 
                                    />
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="upi">
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="upiId">UPI ID</Label>
                                    <Input 
                                      id="upiId" 
                                      placeholder="name@upi" 
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Enter your UPI ID and complete the payment on your UPI app.
                                  </p>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="netbanking">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
                                      <div key={bank} className="border rounded-md p-3 text-center cursor-pointer hover:border-blue-500">
                                        {bank}
                                      </div>
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Select your bank and you will be redirected to the bank's payment page.
                                  </p>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        )}

                        {paymentMethod === 'venue' && (
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-start">
                              <Check size={20} className="text-green-500 mr-2 mt-1" />
                              <div>
                                <p className="font-medium">Pay at the venue</p>
                                <p className="text-sm text-gray-600">
                                  You can pay in cash or using card/UPI when you arrive at the venue.
                                  Please arrive 15 minutes before your slot time.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Confirm & ${paymentMethod === 'online' ? 'Pay' : 'Book'}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Booking summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-md sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                  
                  <div className="mb-4">
                    <img 
                      src={venue.images[0]} 
                      alt={venue.name} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <h3 className="font-medium mt-2">{venue.name}</h3>
                    <p className="text-sm text-gray-600">{venue.address}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span>{format(new Date(currentBooking.date), 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span>{currentBooking.timeSlot.startTime} - {currentBooking.timeSlot.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Players</span>
                      <span>{currentBooking.playerCount}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span>₹{venue.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Players</span>
                      <span>× {currentBooking.playerCount}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{currentBooking.totalPrice}</span>
                    </div>
                  </div>
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

export default Payment;