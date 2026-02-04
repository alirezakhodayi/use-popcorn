import { useEffect, useState } from "react";
import type { IMovie } from "../types";

const APIKEY = import.meta.env.VITE_API_KEY;

export function useMovies(query: string) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!response.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await response.json();

          if (data.Response === "False") throw new Error("Movie Not Found!");

          setMovies(data.Search);
          setError("");
        } catch (err: unknown) {
          if (err instanceof Error && err.name !== "AbortError")
            setError(err.message);
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

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, error };
}
