import { useEffect, useRef } from "react";

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function Search({ query, setQuery }: IProps) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (document.activeElement === inputElementRef.current) return;
        if (e.code === "Enter") {
          inputElementRef.current?.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      inputElementRef.current?.focus();

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery],
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleChangeQuery}
      ref={inputElementRef}
    />
  );
}
