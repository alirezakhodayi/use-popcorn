import type { IMovie } from "../../../types";

interface IProps {
  movies: IMovie[];
}
export default function NumResults({ movies }: IProps) {
  return (
    <p className="num-results">
      {movies.length ? (
        <>
          Found
          <strong> {movies.length} </strong>
          results...
        </>
      ) : (
        <>💤😴...</>
      )}
    </p>
  );
}
