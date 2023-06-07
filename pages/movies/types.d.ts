interface Title {
  [locale: string]: string;
  [locale: string]: string;
}

interface Genre {
  label: string;
  value: string;
}

interface Director {
  en: string;
  ka: string;
}

interface Description {
  en: string;
  ka: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  google_id: string;
  img: string;
}

export interface Movie {
  id: number;
  user_id: number;
  title: Title;
  genre: Genre[];
  date: string;
  director: Director;
  description: Description;
  img: string;
  created_at: string;
  updated_at: string;
  user: User;
}
