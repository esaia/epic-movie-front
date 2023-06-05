import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  created_at: string;
  email: string;
  creemail_verified_atated_at: string;
  id: number;
  name: string;
  img: string;
  google_id: string;
  updated_at: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user;
    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
