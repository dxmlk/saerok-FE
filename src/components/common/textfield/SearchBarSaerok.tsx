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
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 페이지 복귀 시 state로 전달된 값 반영
  useEffect(() => {
    const state = location.state as { selectedResult?: string };
    if (state?.selectedResult) {
      setSearchTerm(state.selectedResult);
      // 이후 재진입 방지를 위해 상태를 초기화할 수도 있음 (원하는 경우)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSearchTerm]);

  const handleClick = () => {
    if (disabled) return;

    const targetPage = searchType === "bird" ? "/search/bird" : "/search/place";
    navigate(targetPage, { state: { from: location.pathname } }); // from 정보도 함께 넘김
  };

  return (
    <>
      <div className="relative w-full">
        <div
          onClick={handleClick}
          className={`font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center 
        justify-between cursor-pointer transition bg-white
        ${disabled ? " border-background-whitegray cursor-not-allowed" : " border-font-whitegrayLight"}`}
        >
          <input
            value={searchTerm}
            readOnly
            disabled={disabled}
            placeholder={placeholder}
            className={`outline-none flex w-full items-center text-body-2 ml-20 mr-30
            ${disabled ? "placeholder-font-whitegrayLight " : "placeholder-font-whitegrayDark"} 
            cursor-pointer bg-transparent`}
          />
          <SearchIcon className="w-24 h-24 mr-15 stroke-[2px] stroke-font-whitegrayLight" />
        </div>
      </div>
    </>
  );
};

export default SearchBarSaerok;
