import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (keyword: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar = ({ searchTerm, setSearchTerm, onSearch, placeholder, onFocus, onBlur }: SearchBarProps) => {
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && typeof onSearch === "function") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center bg-white border-saerokGreen justify-between">
      {isInputFocused ? (
        <button onClick={() => handleBackClick()} className="w-17 h-17 ml-14 text-saerokGreen">
          <BackIcon />
        </button>
      ) : (
        <SearchIcon className="w-17 h-17 ml-14 text-font-whitegrayLight" />
      )}

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setIsInputFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setIsInputFocused(false);
          if (onBlur) onBlur();
        }}
        placeholder={placeholder}
        className="outline-none flex w-full items-center text-body-2 placeholder-font-whitegrayLight mx-10 "
      />

      <button onClick={() => setSearchTerm("")}>
        <DeleteIcon className="w-15 h-15 mr-16" />
      </button>
    </div>
  );
};

export default SearchBar;
