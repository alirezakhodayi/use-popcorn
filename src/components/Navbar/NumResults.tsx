import type { IMovie } from "../../types";

interface IProps {
  movies: IMovie[];
}
export default function NumResults({ movies }: IProps) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : "Wait"}</strong> results
    </p>
  );
}
