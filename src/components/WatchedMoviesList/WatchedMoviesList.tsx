import type { IWatchedMovie } from "../../types/watched-movie-interface";
import WatchedMovie from "./WatchedMovie";

interface IProps {
  watched: IWatchedMovie[];
}
function WatchedMoviesList({ watched }: IProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export { WatchedMoviesList };
