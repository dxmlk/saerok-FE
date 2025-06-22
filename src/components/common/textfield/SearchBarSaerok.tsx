import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";

interface SearchBarSaerokProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder: string;
  searchType: "bird" | "place";
  disabled?: boolean;
}

const SearchBarSaerok = ({ searchTerm, setSearchTerm, placeholder, searchType, disabled }: SearchBarSaerokProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  //  상태로 관리
  const [inputValue, setInputValue] = useState("");

  //  props로 받은 searchTerm이 변경되면 inputValue도 업데이트
  useEffect(() => {
    console.log("SearchBarSaerok 렌더링됨, term:", searchTerm);
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleClick = () => {
    if (disabled) return;

    const targetPage = searchType === "bird" ? "/search/bird" : "/search/place";
    navigate(targetPage, {
      state: { from: location.pathname, ...location.state },
    });
  };

  return (
    <div className="relative w-full">
      <div
        onClick={handleClick}
        className={`font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center 
        justify-between cursor-pointer transition bg-white
        ${disabled ? " border-background-whitegray cursor-not-allowed" : " border-font-whitegrayLight"}`}
      >
        <input
          value={inputValue}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          className={`outline-none flex w-full items-center text-body-2 ml-20 mr-30
          ${disabled ? "placeholder-font-whitegrayLight" : "placeholder-font-whitegrayDark"} 
          cursor-pointer bg-transparent`}
        />
        <SearchIcon className="w-24 h-24 mr-15 stroke-[2px] stroke-font-whitegrayLight" />
      </div>
    </div>
  );
};

export default SearchBarSaerok;
