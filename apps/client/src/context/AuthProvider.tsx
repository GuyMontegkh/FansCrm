import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserType } from '@/lib/types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (data: UserType | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<UserType | null>(STORAGE_KEYS.USER, null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const login = useCallback(
    (data: UserType | null) => {
      setUser(data);
      setIsAuthenticated(true);
      navigate('/profile');
    },
    [navigate, setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
