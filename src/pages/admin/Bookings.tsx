import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emptyBooking = {
  user_id: '',
  venue_id: '',
  date: '',
  time_slot: '',
  status: 'confirmed',
  amount: '',
};

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(emptyBooking);

  const fetchAll = async () => {
    setLoading(true);
    const { data: bookingsData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    const { data: venuesData } = await supabase.from('venues').select('id, name');
    const { data: usersData } = await supabase.from('users').select('id, name, email');
    setBookings(bookingsData || []);
    setVenues(venuesData || []);
    setUsers(usersData || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
    };
    await supabase.from('bookings').insert([payload]);
    setShowForm(false);
    setForm(emptyBooking);
    fetchAll();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <Button className="mb-4 bg-purple-600 hover:bg-purple-700" onClick={() => { setShowForm(true); setForm(emptyBooking); }}>
        Add Booking
      </Button>
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">User</label>
                <select name="user_id" value={form.user_id} onChange={handleChange} className="w-full border rounded p-2" required>
                  <option value="">Select user</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Venue</label>
                <select name="venue_id" value={form.venue_id} onChange={handleChange} className="w-full border rounded p-2" required>
                  <option value="">Select venue</option>
                  {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Date</label>
                <Input name="date" value={form.date} onChange={handleChange} type="date" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Time Slot</label>
                <Input name="time_slot" value={form.time_slot} onChange={handleChange} placeholder="e.g. 10:00-11:00" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2">
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Amount</label>
                <Input name="amount" value={form.amount} onChange={handleChange} type="number" required />
              </div>
              <div className="md:col-span-2 flex gap-2 mt-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Add</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : bookings.length === 0 ? <p>No bookings found.</p> : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">User</th>
                  <th className="p-2">Venue</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time Slot</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="p-2">{users.find(u => u.id === b.user_id)?.name || b.user_id}</td>
                    <td className="p-2">{venues.find(v => v.id === b.venue_id)?.name || b.venue_id}</td>
                    <td className="p-2">{b.date}</td>
                    <td className="p-2">{b.time_slot}</td>
                    <td className="p-2">{b.status}</td>
                    <td className="p-2">₹{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings; 