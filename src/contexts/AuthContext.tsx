import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('sportsspot-user');
    const storedIsAdmin = localStorage.getItem('sportsspot-isAdmin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setIsAdmin(storedIsAdmin === 'true');
    }
  }, []);

  const login = async (email: string, password: string, adminLogin?: boolean) => {
    // Mock login functionality (replace with Supabase later)
    const mockUser = {
      id: '1',
      email,
      name: adminLogin ? 'Admin User' : 'Test User',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsAdmin(adminLogin || false);
    localStorage.setItem('sportsspot-user', JSON.stringify(mockUser));
    localStorage.setItem('sportsspot-isAdmin', String(adminLogin || false));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup functionality (replace with Supabase later)
    const mockUser = {
      id: '1',
      email,
      name,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('sportsspot-user', JSON.stringify(mockUser));
    localStorage.setItem('sportsspot-isAdmin', 'false');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('sportsspot-user');
    localStorage.removeItem('sportsspot-isAdmin');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};