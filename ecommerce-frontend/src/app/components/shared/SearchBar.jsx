import { StyledSearchBar } from "./styles/SearchBar.styled";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return ( 
        <StyledSearchBar>
            <FaSearch />
            <input type="text" placeholder="Search..." />
            
        </StyledSearchBar>
     );
}

export default SearchBar;