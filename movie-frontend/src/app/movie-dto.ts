export interface MovieDto{

  movieId: number;
  title: string;
  timeSlots: string;
  rating: number;
  releaseDate: string;
  imageurl: string;
  duration: number;
  ticketPrice: string;
  synopsis: string;
  genre: string[];
  enabled: boolean;
}
