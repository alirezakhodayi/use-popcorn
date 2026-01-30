import type { IMovie } from "../../types/movie-interface";
import Movie from "./Movie";

interface IProps {
  movies: IMovie[];
}

function MoviesList({ movies }: IProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export { MoviesList };
