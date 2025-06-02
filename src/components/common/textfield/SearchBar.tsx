import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as DeleteIcon } from "assets/icons/button/delete.svg";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import axios from "axios";

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

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && typeof onSearch === "function") {
      onSearch(searchTerm);
    }
  };

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await axios.get("/api/v1/birds/autocomplete", {
          params: { q: searchTerm.trim() },
        });
        setSuggestions(res.data.suggestions || []);
        console.log(suggestions);
      } catch (err) {
        console.error("자동완성 실패:", err);
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <>
      <div className="relative w-full">
        <div className="font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center bg-white border-mainBlue justify-between">
          {isInputFocused && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleBackClick}
              className="w-17 h-17 ml-14 text-mainBlue"
            >
              <BackIcon />
            </button>
          )}
          {!isInputFocused && <SearchIcon className="w-17 h-17 ml-14 text-font-whitegrayLight" />}

          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsInputFocused(true);
              if (onFocus) onFocus();
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsInputFocused(false);
                setShowSuggestions(false);
              }, 150);
              if (onBlur) onBlur();
            }}
            placeholder={placeholder}
            className="outline-none flex w-full items-center text-body-2 placeholder-font-whitegrayLight mx-10 "
          />

          <button onClick={() => setSearchTerm("")}>
            <DeleteIcon className="w-15 h-15 mr-16" />
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-font-whitegrayLight z-40 rounded shadow-md">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchTerm(item);
                  setShowSuggestions(false);
                  onSearch(item);
                }}
                className="px-12 py-8 text-sm cursor-pointer font-pretendard  hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
