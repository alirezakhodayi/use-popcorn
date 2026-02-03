interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function Search({ query, setQuery }: IProps) {
  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleChangeQuery}
    />
  );
}
