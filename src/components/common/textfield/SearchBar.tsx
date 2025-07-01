import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "assets/icons/button/delete.svg";
import { ReactComponent as BackIcon } from "assets/icons/button/back.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { useState, forwardRef } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (keyword: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onBack?: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ searchTerm, setSearchTerm, onSearch, placeholder, onFocus, onBlur, onBack }, ref) => {
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

    return (
      <div className="relative w-full">
        <div className="font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center bg-white border-mainBlue justify-between">
          {onBack ? (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={onBack}
              className="w-17 h-17 ml-14 text-mainBlue"
              tabIndex={-1}
            >
              <BackIcon />
            </button>
          ) : (
            isInputFocused && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleBackClick}
                className="w-17 h-17 ml-14 text-mainBlue"
                tabIndex={-1}
              >
                <BackIcon />
              </button>
            )
          )}
          {!isInputFocused && !onBack && <SearchIcon className="w-22 h-22 ml-14 text-font-whitegrayLight" />}

          <input
            ref={ref}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsInputFocused(true);
              if (onFocus) onFocus();
            }}
            onBlur={(e) => {
              // 자동완성창 내부 클릭이면 닫지 않음
              if (e.relatedTarget && (e.relatedTarget as HTMLElement).closest(".search-suggestions-list")) {
                return;
              }
              setTimeout(() => setIsInputFocused(false), 150);
              if (onBlur) onBlur();
            }}
            placeholder={placeholder}
            className="outline-none flex w-full items-center text-body-2 placeholder-font-whitegrayLight mx-10 "
          />

          <button onClick={() => setSearchTerm("")} tabIndex={-1}>
            <DeleteIcon className="w-15 h-15 mr-16" />
          </button>
        </div>
      </div>
    );
  }
);

export default SearchBar;
