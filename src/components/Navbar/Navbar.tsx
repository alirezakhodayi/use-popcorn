import type { IMovie } from "../../types";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";

interface IProps {
  movies: IMovie[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Navbar({ movies, query, setQuery }: IProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
}

export { Navbar };
