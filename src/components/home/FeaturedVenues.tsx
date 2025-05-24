import { useState } from 'react';
import { Button } from '@/components/ui/button';
import VenueCard from './VenueCard';
import { useVenues } from '@/contexts/VenuesContext';
import { Link } from 'react-router-dom';

const FeaturedVenues = () => {
  const { venues } = useVenues();
  const [activeSport, setActiveSport] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const sportTypes = [...new Set(venues.map(venue => venue.sport))];
  const cities = [...new Set(venues.map(venue => venue.city))];

  const filteredVenues = venues.filter(venue => {
    const matchesSport = !activeSport || venue.sport === activeSport;
    const matchesCity = !activeCity || venue.city === activeCity;
    return matchesSport && matchesCity;
  }).slice(0, 3);

  const handleSportFilter = (sport: string) => {
    setActiveSport(sport === activeSport ? null : sport);
  };

  const handleCityFilter = (city: string) => {
    setActiveCity(city === activeCity ? null : city);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Venues</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated sports facilities in your area. Book your next game at one of these popular venues.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {sportTypes.map(sport => (
              <Button 
                key={sport}
                variant={activeSport === sport ? "default" : "outline"}
                className={`rounded-full ${activeSport === sport ? 'bg-purple-600' : ''}`}
                onClick={() => handleSportFilter(sport)}
              >
                {sport}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map(city => (
              <Button 
                key={city}
                variant={activeCity === city ? "default" : "outline"}
                className={`rounded-full ${activeCity === city ? 'bg-purple-600' : ''}`}
                onClick={() => handleCityFilter(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/book-venue">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105">
              View All Venues
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;