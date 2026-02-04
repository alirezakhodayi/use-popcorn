import { useEffect, useState } from "react";

import {
  Box,
  ErrorMessage,
  Loader,
  Main,
  MovieDetails,
  MoviesList,
  Navbar,
  WatchedMoviesList,
  WatchedSummary,
} from "./components";

import type { IMovie, IWatchedMovie } from "./types";

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const APIKEY = import.meta.env.VITE_API_KEY;

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watched, setWatched] = useState<IWatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: IWatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          );

          if (!response.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie Not Found!");

          setMovies(data.Search);
        } catch (err: unknown) {
          if (err instanceof Error) setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query],
  );

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
