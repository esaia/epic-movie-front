export interface movieTypeForm {
  title_en: string;
  title_ka: string;
  genre: genresOption[];
  date: date;
  director_en: string;
  directo_ka: string;
  description_en: string;
  description_ka: string;
  img: File[];
  user_id: number | undefined;
}

export interface genresOption {
  value: string;
  label: string;
}
