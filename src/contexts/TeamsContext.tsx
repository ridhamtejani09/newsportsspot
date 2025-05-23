import { createContext, useContext, useState, useEffect } from 'react';

export interface Team {
  id: string;
  name: string;
  sport: string;
  city: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: string;
  maxPlayers: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  practiceSchedule: string;
  contactEmail: string;
  logo?: string;
}

interface TeamsContextType {
  teams: Team[];
  createTeam: (teamData: Omit<Team, 'id' | 'members' | 'createdBy' | 'createdAt'>) => void;
  joinTeam: (teamId: string, userId: string) => void;
  getTeamById: (id: string) => Team | undefined;
  getUserTeams: (userId: string) => Team[];
}

const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Thunder Strikers',
    sport: 'Football',
    city: 'Rajkot',
    description: 'Competitive football team looking for passionate players. Weekly practice sessions and monthly tournaments.',
    members: ['1', '2', '3'],
    createdBy: '1',
    createdAt: '2024-01-15',
    maxPlayers: 15,
    skillLevel: 'Intermediate',
    practiceSchedule: 'Tuesday and Thursday evenings',
    contactEmail: 'thunderstrikers@gmail.com',
    logo: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg'
  },
  {
    id: 'team-2',
    name: 'Pickleball Pros',
    sport: 'Pickleball',
    city: 'Ahmedabad',
    description: 'Join our friendly pickleball community. All skill levels welcome!',
    members: ['4', '5'],
    createdBy: '4',
    createdAt: '2024-02-01',
    maxPlayers: 12,
    skillLevel: 'Beginner',
    practiceSchedule: 'Weekend mornings',
    contactEmail: 'pickleballpros@gmail.com',
    logo: 'https://images.pexels.com/photos/8224716/pexels-photo-8224716.jpeg'
  },
  {
    id: 'team-3',
    name: 'Volleyball Vikings',
    sport: 'Volleyball',
    city: 'Rajkot',
    description: 'Competitive volleyball team seeking skilled players for tournaments.',
    members: ['6', '7', '8'],
    createdBy: '6',
    createdAt: '2024-02-15',
    maxPlayers: 12,
    skillLevel: 'Advanced',
    practiceSchedule: 'Monday and Wednesday evenings',
    contactEmail: 'vvikings@gmail.com',
    logo: 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg'
  }
];

const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  createTeam: () => {},
  joinTeam: () => {},
  getTeamById: () => undefined,
  getUserTeams: () => [],
});

export const useTeams = () => useContext(TeamsContext);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);

  useEffect(() => {
    const storedTeams = localStorage.getItem('sportsspot-teams');
    if (storedTeams) {
      setTeams([...mockTeams, ...JSON.parse(storedTeams)]);
    }
  }, []);

  const createTeam = (teamData: Omit<Team, 'id' | 'members' | 'createdBy' | 'createdAt'>) => {
    const newTeam: Team = {
      ...teamData,
      id: `team-${Date.now()}`,
      members: ['1'], // Mock user ID as creator and first member
      createdBy: '1', // Mock user ID
      createdAt: new Date().toISOString(),
    };

    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem('sportsspot-teams', JSON.stringify(updatedTeams));
  };

  const joinTeam = (teamId: string, userId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId && !team.members.includes(userId)) {
        return {
          ...team,
          members: [...team.members, userId],
        };
      }
      return team;
    });

    setTeams(updatedTeams);
    localStorage.setItem('sportsspot-teams', JSON.stringify(updatedTeams));
  };

  const getTeamById = (id: string) => {
    return teams.find(team => team.id === id);
  };

  const getUserTeams = (userId: string) => {
    return teams.filter(team => team.members.includes(userId));
  };

  return (
    <TeamsContext.Provider value={{ teams, createTeam, joinTeam, getTeamById, getUserTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};