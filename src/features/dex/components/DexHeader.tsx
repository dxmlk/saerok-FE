import { ReactComponent as  ScrapIcon } from 'assets/icons/scrap.svg';
import { ReactComponent as  SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as  CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as  HabitatIcon } from 'assets/icons/habitat.svg';
import { ReactComponent as  AaIcon } from 'assets/icons/aa.svg';
import { useState } from 'react';


const DexHeader = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    
    // 나중에 유저 id도 받아야 돼 유저마다 스크랩 다르니까... 
    // const { id } = useParams(); 
    // navigate(`/${id}/scrap`);
    // const navigate = useNavigate();

    const handleFilterClick = (filterName: string) => {
        setActiveFilter(prev => (prev === filterName ? null : filterName));
    };
    const handleSearchClick = () => {

    };

    return (
        <div className='bg-white font-pretendard flex flex-col justify-between h-[114px] px-[24px]'>
            <div className='mt-[17px] flex flex-row justify-between'>
                <span className='text-black font-700 text-[22px]'>도감</span>
                <div className='flex flex-row gap-[31px]'>
                    <button onClick={() => handleFilterClick('스크랩')}>
                        <ScrapIcon className={`h-[21px] ${activeFilter === '스크랩' ? 'fill-green stroke-green' : 'fill-white stroke-black '}`}/></button>
                    <button onClick={handleSearchClick}><SearchIcon className='h-[18.28px]'/></button>
                </div>
            </div>
            <div className='mb-[12px] flex gap-[12px]'>
                <button className={`gap-[5px] flex flex-row text-[15px] w-[70px] h-[33px] rounded-[100px] justify-center items-center ${activeFilter === '계절' ? 'bg-green text-[#fefefe] font-700': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('계절')}>
                    <CalendarIcon className={`w-[13px] h-[13px] ${activeFilter === '계절' ? 'fill-white' : 'fill-black'}`}/>
                    <span>계절</span>
                </button>
                <button className={`gap-[5px] flex flex-row text-[15px] w-[83px] h-[33px] rounded-[100px] justify-center items-center ${activeFilter === '서식지' ? 'bg-green text-[#fefefe] font-700': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('서식지')}>
                    <HabitatIcon className={`w-[13px] h-[11px] ${activeFilter === '서식지' ? 'stroke-white fill-white ' : 'fill-black'}`}/>
                    <span>서식지</span>
                </button>                
                <button className={`gap-[5px] flex flex-row text-[15px] w-[72px] h-[33px] rounded-[100px] justify-center items-center ${activeFilter === '크기' ? 'bg-green text-[#fefefe] font-700 ': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('크기')}>
                    <AaIcon className={`w-[15px] h-[10px] ${activeFilter === '크기' ? 'stroke-white ' : 'fill-black'}`}/>
                    <span>크기</span>
                </button>
            </div>
        </div>
    )
}

// 이거 아이콘 컴포넌트 디자인인 수정 필요

export default DexHeader;


