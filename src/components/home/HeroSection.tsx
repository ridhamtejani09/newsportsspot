import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeIn">
              Play Your Game, Your Way!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-xl">
              Book premium sports venues for football, cricket, pickleball, or volleyball. Join the community of sports enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/book-venue">
                <Button 
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Book Now
                </Button>
              </Link>
              <Link to="/team-hub">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white hover:bg-white/20 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Join a Team
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 lg:ml-10">
            <div className="rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
              <img 
                src="https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg" 
                alt="Sports Ground" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
          <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;