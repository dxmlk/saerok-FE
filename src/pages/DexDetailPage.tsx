import { dexItems } from "features/dex/mock/dexItems";
import DexDetailHeader from "features/dexDetail/components/DexDetailHeader";
import { useParams } from "react-router-dom";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";


const DexDetailPage = ( ) => {
    const { id } = useParams<{ id:string }>();
    
    const item = dexItems.find((item) => item.id == Number(id));

    if (!item) {
        return <div> 존재하지 않는 새입니다. </div>
    }

    const habitatList = item.habitats.split(",").map(habitat => habitat.trim());
    return (
        <div className='min-h-[100vh] bg-white'>
            <DexDetailHeader item={item} />
            <div className='flex flex-col mt-[11px] mx-[24px]'>
                <img src={item.image_urls} alt={item.korean_name} className='w-full rounded-[10px] object-cover'/>
                
                {/* 계절 데이터 안 가져와서 일단 서식지만 */}
                <div className='flex mx-[7px] mt-[16px] gap-[5px]'>
                    {habitatList.map((habitat, idx) => (
                        <div key={idx} className='inline-flex justify-center items-center h-[33px] py-[7px] px-[13px] font-pretendard text-[#fefefe] text-[15px] font-700  rounded-[100px] bg-green'>{habitat}</div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col mt-[29px] mx-[25px]'>
                <span className='font-pretendard font-600 text-[20px] text-black'>분류</span>
                <span className='mt-[12px] font-pretendard font-400 text-[13px] text-[#6d6d6d] '>{item.order_kor} <BracketIcon className="inline-block"/> {item.family_kor} <BracketIcon className="inline-block"/> {item.genus_kor} </span>
            </div>
            <div className='flex flex-col mt-[27px] mx-[25px]'>
                <span className='font-pretendard font-600 text-[20px] text-black'>상세 설명</span>
                <span className='mt-[14px] font-pretendard font-400 text-[15px] text-black '>{item.description} </span>
            </div>
        </div>
        
    )

}

export default DexDetailPage;