import type { IMovie } from "../../types";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";

interface IProps {
  movies: IMovie[];
}

function Navbar({ movies }: IProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}

export { Navbar };
