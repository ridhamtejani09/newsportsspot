import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emptyVenue = {
  name: '',
  sport: '',
  city: '',
  price: '',
  address: '',
  description: '',
  images: '',
  amenities: '',
  rating: '',
};

const Venues = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(emptyVenue);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchVenues = async () => {
    setLoading(true);
    const { data } = await supabase.from('venues').select('*').order('created_at', { ascending: false });
    setVenues(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchVenues(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      images: form.images.split(',').map((s: string) => s.trim()),
      amenities: form.amenities.split(',').map((s: string) => s.trim()),
    };
    if (editId) {
      await supabase.from('venues').update(payload).eq('id', editId);
    } else {
      await supabase.from('venues').insert([payload]);
    }
    setShowForm(false);
    setForm(emptyVenue);
    setEditId(null);
    fetchVenues();
  };

  const handleEdit = (venue: any) => {
    setForm({
      ...venue,
      images: (venue.images || []).join(', '),
      amenities: (venue.amenities || []).join(', '),
    });
    setEditId(venue.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this venue?')) return;
    await supabase.from('venues').delete().eq('id', id);
    fetchVenues();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Venues</h1>
      <Button className="mb-4 bg-purple-600 hover:bg-purple-700" onClick={() => { setShowForm(true); setForm(emptyVenue); setEditId(null); }}>
        Add New Venue
      </Button>
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editId ? 'Edit Venue' : 'Add Venue'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Sport</label>
                <Input name="sport" value={form.sport} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">City</label>
                <Input name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Price (per hour)</label>
                <Input name="price" value={form.price} onChange={handleChange} required type="number" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Address</label>
                <Input name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" required />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Images (comma separated URLs)</label>
                <Input name="images" value={form.images} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Amenities (comma separated)</label>
                <Input name="amenities" value={form.amenities} onChange={handleChange} />
              </div>
              <div>
                <label className="block font-medium mb-1">Rating</label>
                <Input name="rating" value={form.rating} onChange={handleChange} type="number" step="0.1" />
              </div>
              <div className="md:col-span-2 flex gap-2 mt-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">{editId ? 'Update' : 'Add'}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>All Venues</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : venues.length === 0 ? <p>No venues found.</p> : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">Name</th>
                  <th className="p-2">Sport</th>
                  <th className="p-2">City</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map(v => (
                  <tr key={v.id} className="border-t">
                    <td className="p-2">{v.name}</td>
                    <td className="p-2">{v.sport}</td>
                    <td className="p-2">{v.city}</td>
                    <td className="p-2">₹{v.price}</td>
                    <td className="p-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(v)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(v.id)}>Delete</Button>
                    </td>
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

export default Venues; 