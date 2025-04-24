import { ReactComponent as  SearchIcon } from 'assets/icons/search.svg';
import { useNavigate } from "react-router-dom";



const CollectionHeader = () => {
    const navigate = useNavigate();

    function handleEditClick(): void {
        throw new Error("Function not implemented.");
    }

    const handleSearchClick = () => {
        navigate(`/search`);
    }

    return (
        <div className='h-[66px] px-[24px] items-center flex flex-row justify-between bg-white font-pretendard'>
            <span className='text-black font-700 text-[22px]'>컬렉션</span>
            <div className='text-[#0d0d0d] font--400 text-[18px] flex flex-row gap-[18px]'>
                <button onClick={() => handleEditClick()}>편집</button>
                <button onClick={handleSearchClick}><SearchIcon className='h-[18.28px] text-[#0d0d0d]'/></button>
            </div>
        </div>
    )
}
export default CollectionHeader;
