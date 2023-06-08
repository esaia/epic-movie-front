export interface moviePostProps {
  movie: Movie;
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
