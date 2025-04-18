import { ReactComponent as  ScrapIcon } from 'assets/icons/scrap.svg';
import { ReactComponent as  SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as  CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as  LeafIcon } from 'assets/icons/leaf.svg';
import { ReactComponent as  AaIcon } from 'assets/icons/aa.svg';
import { useState } from 'react';


const DexHeader = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    
    const handleFilterClick = (filterName: string) => {
        setActiveFilter(prev => (prev === filterName ? null : filterName));
    };

    return (
        <div className='bg-white font-pretendard flex flex-col justify-between h-[106px] px-[24px]'>
            <div className='mt-[24px] flex flex-row justify-between'>
                <span className='text-black font-700 text-[22px]'>도감</span>
                <div className='flex flex-row gap-[30px]'>
                    <ScrapIcon className='w-[14px] h-[21px]'/>
                    <SearchIcon className='w-[18.28px] h-[18.28px]'/>
                </div>
            </div>
            <div className='mb-[9px] flex gap-[10px]'>
                <button className={`shadow flex flex-row text-[13.536px] w-[65px] h-[30px] rounded-[90.238px] justify-center items-center gap-[6px] ${activeFilter === '계절' ? 'bg-green text-[#fefefe] font-700 border-green': 'border text-[#0d0d0d] font-400 border-[#C6C6C6] bg-[#FEFEFE]'}`}
                        onClick={() => handleFilterClick('계절')}>
                    <CalendarIcon className={`w-[13px] h-[13px] ${activeFilter === '계절' ? 'stroke-white' : 'stroke-black'}`}/>
                    <span>계절</span>
                </button>
                <button className={`shadow flex flex-row text-[13.536px] w-[75px] h-[30px] rounded-[90.238px] justify-center items-center gap-[6px] ${activeFilter === '서식지' ? 'bg-green text-[#fefefe] font-700 border-green': 'border text-[#0d0d0d] font-400 border-[#C6C6C6] bg-[#FEFEFE]'}`}
                        onClick={() => handleFilterClick('서식지')}>
                    <LeafIcon className={`w-[12px] h-[12px] ${activeFilter === '서식지' ? 'stroke-white' : 'stroke-black'}`}/>
                    <span>서식지</span>
                </button>                
                <button className={`shadow flex flex-row text-[13.536px] w-[65px] h-[30px] rounded-[90.238px] justify-center items-center gap-[6px] ${activeFilter === '크기' ? 'bg-green text-[#fefefe] font-700 border-green': 'border text-[#0d0d0d] font-400 border-[#C6C6C6] bg-[#FEFEFE]'}`}
                        onClick={() => handleFilterClick('크기')}>
                    <AaIcon className={`w-[16px] h-[14px] ${activeFilter === '크기' ? 'stroke-white' : 'stroke-black'}`}/>
                    <span>크기</span>
                </button>
            </div>
        </div>
    )
}

export default DexHeader;


