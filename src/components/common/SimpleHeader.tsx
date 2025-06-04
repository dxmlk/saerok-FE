import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { useNavigate } from "react-router-dom";

interface SimpleHeaderProps {
  title: string;
}

const SimpleHeader = ({ title }: SimpleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative px-24 w-full h-68 bg-white flex flex-row items-center justify-center">
      <button onClick={() => navigate(-1)}>
        <BracketIcon className="absolute left-24 bottom-26 w-17 h-17 scale-x-[-1] fill-black" />
      </button>
      <div className="font-moneygraphy text-subtitle-2 text-font-black">{title}</div>
    </div>
  );
};

export default SimpleHeader;
