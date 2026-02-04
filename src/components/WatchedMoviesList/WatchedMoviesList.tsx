import type { IWatchedMovie } from "../../types/watched-movie-interface";
import WatchedMovie from "./WatchedMovie";

interface IProps {
  watched: IWatchedMovie[];
  onDeleteWatched: (id: string) => void;
}
function WatchedMoviesList({ watched, onDeleteWatched }: IProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export { WatchedMoviesList };
