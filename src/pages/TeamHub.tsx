import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTeams } from '@/contexts/TeamsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Search, Plus, MapPin, Calendar, UserPlus } from 'lucide-react';

const TeamHub = () => {
  const { teams, getUserTeams, joinTeam } = useTeams();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const userTeams = isAuthenticated ? getUserTeams('1') : []; // Mock user ID
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinTeam = (teamId: string) => {
    if (!isAuthenticated) return;
    joinTeam(teamId, '1'); // Mock user ID
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-purple-600 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Team Hub</h1>
              <p className="text-purple-100 mb-4 md:mb-0">Create or join teams and play with others</p>
            </div>
            <Link to="/create-team">
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                <Plus size={16} className="mr-2" />
                Create New Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Teams</TabsTrigger>
              <TabsTrigger value="my-teams">My Teams</TabsTrigger>
            </TabsList>
            
            <div className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search teams by name, sport, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <TabsContent value="all">
              {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams.map(team => (
                    <Card key={team.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-4">
                          <Badge className="bg-white text-purple-600 mb-2">{team.sport}</Badge>
                          <h3 className="text-xl font-bold text-white">{team.name}</h3>
                          <div className="flex items-center text-purple-100 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{team.city}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 mb-4 line-clamp-2">{team.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Users size={16} className="mr-1" />
                              <span>{team.members.length} members</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar size={16} className="mr-1" />
                              <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full mt-4"
                            variant={userTeams.some(t => t.id === team.id) ? "outline" : "default"}
                            onClick={() => handleJoinTeam(team.id)}
                            disabled={userTeams.some(t => t.id === team.id) || !isAuthenticated}
                          >
                            {userTeams.some(t => t.id === team.id) ? (
                              'Already Joined'
                            ) : (
                              <>
                                <UserPlus size={16} className="mr-2" />
                                {isAuthenticated ? 'Join Team' : 'Login to Join'}
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No teams found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or create a new team</p>
                  <Link to="/create-team">
                    <Button>Create a Team</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-teams">
              {!isAuthenticated ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Login to see your teams</h3>
                  <p className="text-gray-600 mb-6">You need to be logged in to view your teams</p>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </div>
              ) : userTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userTeams.map(team => (
                    <Card key={team.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-4">
                          <Badge className="bg-white text-purple-600 mb-2">{team.sport}</Badge>
                          <h3 className="text-xl font-bold text-white">{team.name}</h3>
                          <div className="flex items-center text-purple-100 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{team.city}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 mb-4 line-clamp-2">{team.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Users size={16} className="mr-1" />
                              <span>{team.members.length} members</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar size={16} className="mr-1" />
                              <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-4" variant="outline">
                            View Team Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">You haven't joined any teams yet</h3>
                  <p className="text-gray-600 mb-6">Join an existing team or create your own</p>
                  <Link to="/create-team">
                    <Button>Create a Team</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamHub;