import { useNavigate } from "react-router-dom";
import { collectionItems } from "../../mock/collectionItems";
import { dexItems } from "features/dex/mock/dexItems";



const CollectionList = () => {
    const navigate = useNavigate();

    const handleItemClick = (id: number) => {
        navigate(`/collection-detail/${id}`);
    }

    return (
        <>
            <div className='mt-[21px] grid grid-cols-1 gap-[10px]'>
                {collectionItems.map((item) => {
                    const matchedDex = dexItems.find(dex => dex.korean_name === item.name);

                    return (
                    <div key={item.id} onClick={() => handleItemClick(item.id)} className='relative rounded-[10px] border border-[1px] border-[#D9D9D9] bg-white flex flex-row w-full h-[123px] overflow-hidden transform transition-transform duration-300 hover:hover:scale-105'>
                            <img src={item.img_urls[0]} alt={item.name} className='h-full h-[123px] object-cover'/>
                            <div className='flex flex-col justify-between  font-pretendard mx-[13px] py-[12px] '>
                                <div>
                                    <span className='block text-[#000000] text-[15px] font-600'>{item.name}</span>
                                    <span className='block text-[#979797] text-[13px] font-400'>{matchedDex ? matchedDex.scientific_name : "학명 없음"}</span>
                                </div>
                                <div>
                                    <span className='block text-[#0d0d0d] text-[13px] font-400'>{item.date}</span>
                                    <span className='block text-[#0d0d0d] text-[13px] font-400'>{item.location}</span>
                                </div>
                            </div>
                    </div>
                    )
                })}

            </div>
        </>
    )

}

export default CollectionList;