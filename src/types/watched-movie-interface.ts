export interface IWatchedMovie {
  imdbId: string;
  title: string;
  year: string;
  poster: string;
  runtime: number | undefined;
  imdbRating: number | undefined;
  userRating: number | undefined;
}
