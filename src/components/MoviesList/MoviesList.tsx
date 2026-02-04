import type { IMovie } from "../../types/movie-interface";
import Movie from "./Movie";

interface IProps {
  movies: IMovie[];
  onSelectMovie: (id: string) => void;
}

function MoviesList({ movies, onSelectMovie }: IProps) {
  if (!movies.length)
    return (
      <div className="start-search">
        <p>Search for an amazing movie! 📽️🎞️</p>
      </div>
    );

  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export { MoviesList };
