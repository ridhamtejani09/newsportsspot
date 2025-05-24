import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTeams } from '@/contexts/TeamsContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

const CreateTeam = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createTeam } = useTeams();
  const { isAuthenticated } = useAuth();

  const [teamName, setTeamName] = useState('');
  const [sport, setSport] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to create a team",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!teamName || !sport || !city) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create the team
    createTeam({
      name: teamName,
      sport,
      city,
      description,
      maxPlayers: 12, // default or you can add a field for this
      skillLevel: 'Beginner', // default or add a field
      practiceSchedule: '', // default or add a field
      contactEmail: '', // default or add a field
      logo: '', // default or add a field
    });

    toast({
      title: "Team created successfully!",
      description: `Your team "${teamName}" has been created.`,
    });

    setIsSubmitting(false);
    navigate('/team-hub');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate('/team-hub')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Team Hub
          </Button>

          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create a New Team</h1>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="teamName">Team Name</Label>
                      <Input 
                        id="teamName" 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)} 
                        placeholder="Enter your team name" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="sport">Sport</Label>
                      <Select value={sport} onValueChange={setSport} required>
                        <SelectTrigger id="sport">
                          <SelectValue placeholder="Select a sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Football">Football</SelectItem>
                            <SelectItem value="Cricket">Cricket</SelectItem>
                            <SelectItem value="Volleyball">Volleyball</SelectItem>
                            <SelectItem value="Pickleball">Pickleball</SelectItem>
                            <SelectItem value="Basketball">Basketball</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Select value={city} onValueChange={setCity} required>
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Rajkot">Rajkot</SelectItem>
                            <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                            <SelectItem value="Surat">Surat</SelectItem>
                            <SelectItem value="Vadodara">Vadodara</SelectItem>
                            <SelectItem value="Mumbai">Mumbai</SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Bangalore">Bangalore</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Team Description</Label>
                      <Textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Tell us about your team, play style, skill level, etc." 
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating Team...' : 'Create Team'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTeam;