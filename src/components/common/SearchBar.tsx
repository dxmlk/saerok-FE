import { useNavigate } from "react-router-dom";
import { ReactComponent as BackGreenIcon } from "assets/icons/backgreen.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onSearch: (keyword: string) => void;
}
const SearchBar = ({searchTerm, setSearchTerm, onSearch}: SearchBarProps) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/dex`);
    }
    // 하단 바에서 선택 위치에 따라서 돌아갈 곳 정할 수 있을 듯, 지금은 컬렉션 검색으로 가도 다른 곳으로 이동 ㅠㅠ

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchTerm);
        }
    }

    return (
        <div className='relative h-[44px] w-full flex flex-row border border-green rounded-[10px] border-[2px] items-center bg-white justify-between'>
            <button onClick={ () => handleBackClick()}><BackGreenIcon className='w-[22.81px] h-[24px] ml-[14.26px] '/></button>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown = {handleKeyDown} placeholder=' 궁금한 새를 찾아보세요!' className='flex w-full items-center font-pretendard font-400 text-[15px] text-[#6d6d6d]'/>
            <button onClick={() => setSearchTerm("")}><DeleteIcon className='w-[32px] h-[32px] mr-[6px]'/></button>
        </div>
    )
}

export default SearchBar;