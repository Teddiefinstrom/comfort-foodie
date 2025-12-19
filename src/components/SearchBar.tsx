import { useState } from "react";

type searchProps = {
    onSearch: (value: string) => void;
}

const SearchBar = ({onSearch}: searchProps) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input);
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
