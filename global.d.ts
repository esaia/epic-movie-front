interface Title {
  [locale: string]: string;
  [locale: string]: string;
}

export interface Genre {
  id: number;
  label: genreLabel;
  value: string;
  created_at: string;
  updated_at: string;
}
interface genreLabel {
  [locale: string]: string;
}

interface Director {
  [locale: string]: string;
  [locale: string]: string;
}

interface Description {
  [locale: string]: string;
  [locale: string]: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  google_id: string;
  img: string;
}

export interface Quote {
  id: number;
  quote: {
    [locale: string]: string;
    [locale: string]: string;
  };
  img: string;
  movie_id: number;
  movie: Movie;
  user: User;
  created_at: string;
  updated_at: string;
  comment?: comment[];
  like: likes[];
}

export interface Movie {
  id: number;
  user_id: number;
  title: Title;
  genres: Genre[];
  date: string;
  director: Director;
  description: Description;
  img: string;
  created_at: string;
  updated_at: string;
  user?: User;
  quote?: Quote[];
}

export interface movieTypeForm {
  title_en: string;
  title_ka: string;
  genre: Genres[];
  date: date;
  director_en: string;
  director_ka: string;
  description_en: string;
  description_ka: string;
  img: File[];
  user_id: number | undefined;
}

export interface quoteForm {
  quote_en: string;
  quote_ka: string;
  img: File[0];
}

export interface commentForm {
  user_id: string;
  quote_id: string;
  comment: string;
}

export interface comment {
  user_id: string;
  quote_id: string;
  comment: string;
  user: User;
  id: number;
}

enum NotificationStatus {
  Comment = "comment",
  Like = "like",
}

export interface notification {
  id: number;
  sender_id: number;
  quote_id: number;
  seen: number;
  status: NotificationStatus;
  sender: User;
  quote: Quote;
  created_at: string;
  updated_at: string;
}

export interface profileInputType {
  name: string;
  password: string;
  password_confirmation: string;
  email: string;
  img: string;
}

export interface Window {
  Echo: any;
}

export interface loginDataType {
  email: string;
  password: string;
  remember?: boolean;
}

export interface registerUserType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface recoveryPassType {
  password: string;
  password_confirmation: string;
  email: string | string[] | undefined;
  token: string | string[] | undefined;
}

export interface forgetPasswordType {
  email: string;
}
export interface likes {
  id?: number;
  user_id: number | undefined;
  quote_id: number;
}

export interface queryType {
  searchQuery: string;
}
