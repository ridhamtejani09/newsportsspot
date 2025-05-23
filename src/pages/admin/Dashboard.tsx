import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin, AdminVenue, AdminBooking } from '@/contexts/AdminContext';
import { 
  Building, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { venues, bookings, isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const stats = {
    totalVenues: venues.length,
    activeBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    totalUsers: 150, // Mock data
  };

  const recentBookings = bookings.slice(0, 5);
  const recentVenues = venues.slice(0, 5);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <Building className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Venues</p>
              <h3 className="text-2xl font-bold">{stats.totalVenues}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Active Bookings</p>
              <h3 className="text-2xl font-bold">{stats.activeBookings}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <DollarSign className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{stats.totalRevenue}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.userName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} - {booking.timeSlot.startTime}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">₹{booking.amount}</span>
                      {booking.status === 'confirmed' && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                      {booking.status === 'pending' && (
                        <Clock className="text-yellow-500" size={20} />
                      )}
                      {booking.status === 'cancelled' && (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => setActiveTab('bookings')}
              >
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Venues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVenues.map(venue => (
                  <div key={venue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{venue.name}</p>
                      <p className="text-sm text-gray-500">{venue.city} - {venue.sport}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">₹{venue.price}/hr</span>
                      {venue.status === 'active' && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                      {venue.status === 'maintenance' && (
                        <Clock className="text-yellow-500" size={20} />
                      )}
                      {venue.status === 'inactive' && (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => setActiveTab('venues')}
              >
                View All Venues
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="venues">
          <Card>
            <CardHeader>
              <CardTitle>Manage Venues</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="mb-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/admin/venues/new')}
              >
                Add New Venue
              </Button>
              
              <div className="space-y-4">
                {venues.map(venue => (
                  <div key={venue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{venue.name}</p>
                      <p className="text-sm text-gray-500">{venue.city} - {venue.sport}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/venues/${venue.id}`)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Manage Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.userName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} - {booking.timeSlot.startTime}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;