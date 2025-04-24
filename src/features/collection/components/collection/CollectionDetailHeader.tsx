import { CollectionItemsType } from "features/collection/mock/collectionItems";
import { ReactComponent as BackIcon } from "assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { dexItems } from "features/dex/mock/dexItems";

interface CollectionDetailHeaderProps {
    item: CollectionItemsType;
}


const CollectionDetailHeader = ({item}: CollectionDetailHeaderProps ) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/collection`);
    }

    if (!item) {
        return null;
    }

    function handleEditClick(): void {
        throw new Error("Function not implemented.");
    }
    
    const matchedDex = dexItems.find(dex => dex.korean_name === item.name);
    

    return (
        <div className='font-pretendard w-full h-[65px] flex flex-row items-center justify-between bg-white'>
            <div className='ml-[24px] flex flex-row gap-[18px]'>
                <button onClick={() => handleBackClick()}><BackIcon className='w-[9px] h-[15.758px]'/></button>
                <div className='flex flex-col '>
                    <span className='leading-tight font-700 text-black text-[20px]'>{item.name}</span>
                    <span className='leading-none font-400 text-[#979797] text-[15px]'>{matchedDex ? matchedDex.scientific_name : "학명 없음"}</span>
                </div>
            </div>
            <button onClick={() => handleEditClick()} className='mr-[24px] font-400 text-[18px] text-[#0d0d0d] '>편집</button>
        </div>
    )
}

export default CollectionDetailHeader; 