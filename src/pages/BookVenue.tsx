import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVenues } from '@/contexts/VenuesContext';
import VenueCard from '@/components/home/VenueCard';
import { Search, MapPin, Filter } from 'lucide-react';

const BookVenue = () => {
  const { venues, filterVenues } = useVenues();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSport, setActiveSport] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const sportTypes = [...new Set(venues.map(venue => venue.sport))];
  const cities = [...new Set(venues.map(venue => venue.city))];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         venue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !activeSport || venue.sport === activeSport;
    const matchesCity = !activeCity || venue.city === activeCity;
    return matchesSearch && matchesSport && matchesCity;
  });

  const handleSportFilter = (sport: string) => {
    setActiveSport(sport === activeSport ? null : sport);
  };

  const handleCityFilter = (city: string) => {
    setActiveCity(city === activeCity ? null : city);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveSport(null);
    setActiveCity(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-purple-600 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Find and Book Sports Venues</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg rounded-lg shadow-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              className="bg-white text-purple-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
            {(activeSport || activeCity || searchTerm) && (
              <Button 
                variant="ghost" 
                className="text-white"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            )}
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Sports</h3>
                <div className="flex flex-wrap gap-2">
                  {sportTypes.map(sport => (
                    <Button 
                      key={sport}
                      variant={activeSport === sport ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full ${activeSport === sport ? 'bg-purple-600' : ''}`}
                      onClick={() => handleSportFilter(sport)}
                    >
                      {sport}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Cities</h3>
                <div className="flex flex-wrap gap-2">
                  {cities.map(city => (
                    <Button 
                      key={city}
                      variant={activeCity === city ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full ${activeCity === city ? 'bg-purple-600' : ''}`}
                      onClick={() => handleCityFilter(city)}
                    >
                      <MapPin size={14} className="mr-1" />
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Venues</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="cricket">Cricket</TabsTrigger>
              <TabsTrigger value="volleyball">Volleyball</TabsTrigger>
              <TabsTrigger value="pickleball">Pickleball</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVenues.map(venue => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No venues found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                  <Button onClick={handleResetFilters}>Reset Filters</Button>
                </div>
              )}
            </TabsContent>
            
            {sportTypes.map(sport => (
              <TabsContent key={sport} value={sport.toLowerCase()}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {venues
                    .filter(venue => venue.sport === sport)
                    .map(venue => (
                      <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookVenue;