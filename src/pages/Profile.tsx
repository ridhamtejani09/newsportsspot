import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/supabaseClient';

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Fetch user's bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoadingBookings(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*, venue:venue_id(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setBookings(data);
      setLoadingBookings(false);
    };
    fetchBookings();
  }, [user]);

  // Update user info in Supabase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await supabase.from('users').update({ name, email }).eq('id', user.id);
    setEditMode(false);
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">My Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="bookings">Booking History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <form onSubmit={handleSave} className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={!editMode}
                      />
                    </div>
                    {editMode ? (
                      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Save</Button>
                    ) : (
                      <Button type="button" className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setEditMode(true)}>Edit Profile</Button>
                    )}
                  </form>
                </TabsContent>

                {/* Booking History Tab */}
                <TabsContent value="bookings">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">My Bookings</h2>
                    {loadingBookings ? (
                      <p>Loading...</p>
                    ) : bookings.length === 0 ? (
                      <p className="text-gray-500">No bookings found.</p>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {bookings.map(b => (
                          <li key={b.id} className="py-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{b.venue?.name || b.venue_id}</div>
                                <div className="text-xs text-gray-500">{b.date} | {b.time_slot}</div>
                                <div className="text-xs text-gray-500">Status: {b.status}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold">₹{b.amount}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="max-w-md mx-auto">
                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <p className="text-gray-500">Settings and password change coming soon.</p>
                  </div>
                </TabsContent>
              </Tabs>
              <Button className="w-full mt-8 bg-red-500 hover:bg-red-600" onClick={logout}>Logout</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile; 