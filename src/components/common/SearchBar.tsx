import { useNavigate } from "react-router-dom";
import { ReactComponent as BackGreenIcon } from "assets/icons/backgreen.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (keyword: string) => void;
  showBackButton?: boolean;
  placeholder?: string;
  borderColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  showBackButton = true,
  placeholder = "궁금한 새를 찾아보세요!",
  borderColor = "#51BEA6",
  onFocus,
  onBlur,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div
      className="relative h-[44px] w-full flex flex-row border rounded-[10px] border-[2px] items-center bg-white justify-between"
      style={{ borderColor }}
    >
      {showBackButton && isInputFocused && (
        <button onClick={() => handleBackClick()}>
          <BackGreenIcon className="w-[22.81px] h-[24px] ml-[14.26px] mr-[-20px]" />
        </button>
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
        className="outline-none flex w-full items-center font-pretendard font-400 text-[15px] mx-[20px] text-[#6d6d6d]"
      />
      <button onClick={() => setSearchTerm("")}>
        {searchTerm ? (
          <DeleteIcon className="w-[32px] h-[32px] mr-[6px]" />
        ) : (
          <SearchIcon className="w-[18.279pxpx] h-[18.279pxpx] mr-[13.72px]  text-[#d9d9d9]" />
        )}
      </button>
    </div>
  );
};

export default SearchBar;
