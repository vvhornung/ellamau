import { useState } from "react";
import { useRouter } from "next/navigation";
import { StyledSearchBar } from "./styles/SearchBar.styled";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <StyledSearchBar as="form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" aria-label="Search">
        <CiSearch />
      </button>
    </StyledSearchBar>
  );
}

export default SearchBar;
