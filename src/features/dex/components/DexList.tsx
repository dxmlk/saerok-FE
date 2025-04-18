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
                    <div key={item.id} className='rounded-[5px] border border-[#D9D9D9] bg-[#FEFEFE] flex flex-col w-full h-[198px] overflow-hidden transform transition-transform duration-300 hover:hover:scale-105'>
                        <img src={item.birdImg} alt={item.nameKor} className='w-full h-[142px] object-cover'/>
                        <span className='ml-[11.45px] mt-[10px] text-[#000000] text-[15px] font-pretendard font-600'>{item.nameKor}</span>
                        <span className='ml-[11.45px] mb-[10px] text-[#979797] text-[13px] font-pretendard font-400'>{item.nameEng}</span>
                    </div>  
                ))}

            </div>
        </>
    );
  };
  export default DexList;
