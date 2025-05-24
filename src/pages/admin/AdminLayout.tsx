import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Venues', path: '/admin/venues' },
  { label: 'Bookings', path: '/admin/bookings' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Analytics', path: '/admin/analytics' },
  { label: 'Profile', path: '/admin/profile' },
];

const AdminLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button className="w-full bg-red-500 hover:bg-red-600">Logout</Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 