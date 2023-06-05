export interface User {
  created_at: string;
  email: string;
  creemail_verified_atated_at: string;
  id: number;
  name: string;
  img: string;
  google_id: string;
  updated_at: string;
}

export interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
