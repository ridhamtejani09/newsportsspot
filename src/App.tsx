import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Home from '@/pages/Home';
import BookVenue from '@/pages/BookVenue';
import VenueDetails from '@/pages/VenueDetails';
import TeamHub from '@/pages/TeamHub';
import CreateTeam from '@/pages/CreateTeam';
import ContactUs from '@/pages/ContactUs';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import BookingConfirmation from '@/pages/BookingConfirmation';
import Payment from '@/pages/Payment';
import Dashboard from '@/pages/admin/Dashboard';
import Venues from '@/pages/admin/Venues';
import Bookings from '@/pages/admin/Bookings';
import Users from '@/pages/admin/Users';
import Analytics from '@/pages/admin/Analytics';
import AdminProfile from '@/pages/admin/AdminProfile';
import AdminLayout from '@/pages/admin/AdminLayout';
import { VenuesProvider } from '@/contexts/VenuesContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { TeamsProvider } from '@/contexts/TeamsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminProvider } from '@/contexts/AdminContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sportsspot-theme">
      <AuthProvider>
        <AdminProvider>
          <VenuesProvider>
            <BookingProvider>
              <TeamsProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book-venue" element={<BookVenue />} />
                    <Route path="/venue/:id" element={<VenueDetails />} />
                    <Route path="/team-hub" element={<TeamHub />} />
                    <Route path="/create-team" element={<CreateTeam />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
                    <Route path="/payment/:id" element={<Payment />} />
                    {/* Admin Panel Nested Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="venues" element={<Venues />} />
                      <Route path="bookings" element={<Bookings />} />
                      <Route path="users" element={<Users />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="profile" element={<AdminProfile />} />
                    </Route>
                  </Routes>
                </Router>
                <Toaster />
              </TeamsProvider>
            </BookingProvider>
          </VenuesProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;