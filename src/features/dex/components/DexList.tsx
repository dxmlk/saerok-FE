import { ReactComponent as ScrapIcon } from "assets/icons/scrap.svg";
import { ReactComponent as ScrapFilledIcon } from "assets/icons/scrapfilled.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DexItemsType } from "../mock/dexItems";



interface DexListProps {
    dexItems: DexItemsType[];
}

const DexList = ({dexItems}: DexListProps ) => {
    const navigate = useNavigate();
    const [scrappedItems, setScrappedItems] = useState<number[]>([]);
    
    const handleItemClick = (id: number) => {
        navigate(`/dexdetail/${id}`);
    }
    const handleScrapClick = (id: number) => {
        setScrappedItems((prev) => 
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );

    }

    return (
        <>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]'>
                {dexItems.map((item) => (
                    <button key={item.id} onClick={() => handleItemClick(item.id)} className='relative rounded-[10px] border border-[1px] border-[#D9D9D9] bg-[#FEFEFE] flex flex-col w-full h-[198px] overflow-hidden transform transition-transform duration-300 hover:hover:scale-105'>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // 카드 전체 클릭 막기
                                    handleScrapClick(item.id);
                                }}
                                className="absolute top-[15px] right-[14px] z-10"
                            >
                                {scrappedItems.includes(item.id) ? (
                                    <ScrapFilledIcon className="h-[21px] " />
                                ) : (
                                    <ScrapIcon className="h-[21px] " />
                                )}
                            </button>
                            <img src={item.image_urls} alt={item.korean_name} className='w-full h-[142px] object-cover'/>
                            <span className='mx-[11px] mt-[10px] font-pretendard flex flex-col text-[#000000] text-[15px] font-600'>{item.korean_name}</span>
                            <span className='mx-[11px] font-pretendard flex flex-col text-[#979797] text-[13px] font-400'>{item.scientific_name}</span>
                    </button>
                ))}

            </div>
        </>
    );
  };
  export default DexList;
