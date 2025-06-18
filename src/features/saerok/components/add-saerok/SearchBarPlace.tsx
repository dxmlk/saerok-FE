import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";

interface SearchBarPlaceProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBarPlace = ({ searchTerm, setSearchTerm }: SearchBarPlaceProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState(searchTerm);

  // 외부 상태 변경 시 inputValue를 항상 동기화
  useEffect(() => {
    setInputValue(searchTerm);
    console.log("🐦 SearchPlace term:", searchTerm);
  }, [searchTerm]);

  const handleClick = () => {
    // 기존 state 유지 + target 명시
    navigate("/search/place", {
      state: {
        ...location.state, // 기존 새 이름 정보 포함
        from: location.pathname,
        target: "place",
      },
    });
  };

  return (
    <div className="relative w-full">
      <div
        onClick={handleClick}
        className={`font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center 
        justify-between cursor-pointer transition bg-white border-font-whitegrayLight`}
      >
        <input
          value={inputValue}
          readOnly
          placeholder="발견 장소를 입력하세요"
          className="outline-none flex w-full items-center text-body-2 ml-20 mr-30 placeholder-font-whitegrayDark cursor-pointer bg-transparent"
        />
        <SearchIcon className="w-24 h-24 mr-15 stroke-[2px] stroke-font-whitegrayLight" />
      </div>
    </div>
  );
};

export default SearchBarPlace;
