import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedVenues from '@/components/home/FeaturedVenues';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const articles = [
    {
      title: "The Rise of Pickleball in India",
      image: "https://images.pexels.com/photos/8224716/pexels-photo-8224716.jpeg",
      category: "Trending",
      date: "March 15, 2024",
      url: "https://www.thehindu.com/sport/other-sports/pickleball-the-fastest-growing-sport-in-india/article67800189.ece"
    },
    {
      title: "Top 10 Cricket Training Tips",
      image: "https://images.pexels.com/photos/3659864/pexels-photo-3659864.jpeg",
      category: "Training",
      date: "March 14, 2024",
      url: "https://www.cricket.com.au/news/features/top-10-cricket-training-tips/2023-03-14"
    },
    {
      title: "Benefits of Playing Volleyball",
      image: "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg",
      category: "Health",
      date: "March 13, 2024",
      url: "https://www.volleyball.org/benefits-of-playing-volleyball/"
    }
  ];

  const events = [
    {
      title: "Summer Cricket Academy",
      date: "April 1 - May 31, 2024",
      location: "City Cricket Ground, Rajkot",
      type: "Training"
    },
    {
      title: "Inter-City Football Tournament",
      date: "April 15-20, 2024",
      location: "Sports Complex, Ahmedabad",
      type: "Tournament"
    },
    {
      title: "Pickleball Workshop",
      date: "April 10, 2024",
      location: "Smash Court, Rajkot",
      type: "Workshop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedVenues />
        
        {/* Sports Articles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Sports World</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest news, tips, and trends from the sports community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover bg-gray-100"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'; }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-purple-100 text-purple-700">{article.category}</Badge>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="text-purple-600 p-0">
                        Read More →
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join exciting tournaments, workshops, and training sessions near you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <Badge 
                      className={`mb-4 ${
                        event.type === 'Tournament' ? 'bg-purple-100 text-purple-700' :
                        event.type === 'Training' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {event.type}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy size={16} className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen size={40} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Stay in the Game</h2>
              <p className="mb-6">
                Subscribe to our newsletter for exclusive sports updates, event notifications, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-lg text-gray-900 min-w-[300px]"
                />
                <Button className="bg-white text-purple-700 hover:bg-purple-50">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;