import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [stats, setStats] = useState({ venues: 0, bookings: 0, users: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentVenues, setRecentVenues] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: venues }, { count: bookings }, { count: users }] = await Promise.all([
        supabase.from('venues').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ venues: venues || 0, bookings: bookings || 0, users: users || 0 });
    };
    const fetchRecent = async () => {
      const { data: bookings } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5);
      const { data: venues } = await supabase.from('venues').select('*').order('created_at', { ascending: false }).limit(5);
      setRecentBookings(bookings || []);
      setRecentVenues(venues || []);
    };
    fetchStats();
    fetchRecent();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Venues</p>
            <h3 className="text-2xl font-bold">{stats.venues}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h3 className="text-2xl font-bold">{stats.bookings}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{stats.users}</h3>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              {recentBookings.length === 0 && <li className="py-2 text-gray-500">No bookings yet.</li>}
              {recentBookings.map(b => (
                <li key={b.id} className="py-2">
                  <div className="flex justify-between">
                    <span>Booking #{b.id}</span>
                    <span>{b.status}</span>
                  </div>
                  <div className="text-xs text-gray-500">{b.date} | Venue: {b.venue_id}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-100">
              {recentVenues.length === 0 && <li className="py-2 text-gray-500">No venues yet.</li>}
              {recentVenues.map(v => (
                <li key={v.id} className="py-2">
                  <div className="flex justify-between">
                    <span>{v.name}</span>
                    <span>{v.city}</span>
                  </div>
                  <div className="text-xs text-gray-500">{v.sport} | ₹{v.price}/hr</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;