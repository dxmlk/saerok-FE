import { ReactComponent as ScrapIcon } from "assets/icons/scrap.svg";

interface DexItemType {
    id: number;
    nameKor: string;
    nameEng: string;
    birdImg: string;
  }


interface DexListProps {
    dexItems: DexItemType[];
}

const DexList = ({dexItems}: DexListProps ) => {
    return (
        <>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]'>
                {dexItems.map((item) => (
                    <div key={item.id} className='rounded-[10px] border border-[1px] border-[#D9D9D9] bg-[#FEFEFE] flex flex-col w-full h-[198px] overflow-hidden transform transition-transform duration-300 hover:hover:scale-105'>
                        <img src={item.birdImg} alt={item.nameKor} className='w-full h-[142px] object-cover'/>
                        <span className='mx-[11px] mt-[10px] font-pretendard flex flex-col text-[#000000] text-[15px] font-600'>{item.nameKor}</span>
                        <span className='mx-[11px] font-pretendard flex flex-col text-[#979797] text-[13px] font-400'>{item.nameEng}</span>
                    </div>  
                ))}

            </div>
        </>
    );
  };
  export default DexList;
