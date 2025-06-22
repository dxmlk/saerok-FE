import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";

interface SearchBarBirdProps {
  searchTerm: string;
  setBirdName: (value: string) => void;
  setBirdId: (id: number | null) => void;
  disabled?: boolean;
}

const SearchBarBird = ({ searchTerm, setBirdName, setBirdId, disabled }: SearchBarBirdProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
    console.log("🐦 SearchBarBird term:", searchTerm);
  }, [searchTerm]);

  const handleClick = () => {
    if (disabled) return;

    navigate("/search/bird", {
      state: {
        ...location.state,
        from: location.pathname,
        target: "bird",
      },
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
          placeholder="새 이름을 입력하세요"
          className={`outline-none flex w-full items-center text-body-2 ml-20 mr-30
          ${disabled ? "text-font-whitegrayLight " : "placeholder-font-whitegrayDark"} 
          cursor-pointer bg-transparent`}
        />
        <SearchIcon className="w-24 h-24 mr-15 stroke-[2px] stroke-font-whitegrayLight" />
      </div>
    </div>
  );
};

export default SearchBarBird;
