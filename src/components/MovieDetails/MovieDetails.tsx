import { useEffect, useState } from "react";
import { StarRating } from "../UI";
import { Loader } from "../UI";
import type { IDetailedMovie, IWatchedMovie } from "../../types";

interface IProps {
  selectedId: string;
  watchedMovies: IWatchedMovie[];
  onCloseMovie: () => void;
  onAddWatched: (movie: IWatchedMovie) => void;
}

const APIKEY = import.meta.env.VITE_API_KEY;

function MovieDetails({
  selectedId,
  watchedMovies,
  onCloseMovie,
  onAddWatched,
}: IProps) {
  const [movie, setMovie] = useState<IDetailedMovie>({} as IDetailedMovie);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbId)
    .includes(selectedId);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbId === selectedId,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie: IWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`,
        );

        const data = await response.json();

        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },

    [selectedId],
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title],
  );

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.code === "Escape") onCloseMovie();
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    defaultRating={0}
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p style={{ textAlign: "center" }}>
                  You rated with movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export { MovieDetails };
