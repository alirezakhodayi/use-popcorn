import { useRef } from "react";
import { useKey } from "../../../hooks";

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function Search({ query, setQuery }: IProps) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  useKey("Enter", function () {
    if (document.activeElement === inputElementRef.current) return;
    inputElementRef.current?.focus();
    setQuery("");
  });

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
