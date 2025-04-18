import { ReactComponent as  ScrapBlackIcon } from 'assets/icons/scrapblack.svg';
import { ReactComponent as ScrapFilledIcon} from 'assets/icons/scrapfilled.svg';
import { ReactComponent as  SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as  CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as  CalendarFilledIcon } from 'assets/icons/calendarfilled.svg';
import { ReactComponent as  HabitatIcon } from 'assets/icons/habitat.svg';
import { ReactComponent as  HabitatFilledIcon } from 'assets/icons/habitatfilled.svg';
import { ReactComponent as  SizeIcon } from 'assets/icons/size.svg';
import { ReactComponent as  SizeFilledIcon } from 'assets/icons/sizefilled.svg';
import { useState } from 'react';


const DexHeader = () => {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    
    // 나중에 유저 id도 받아야 돼 유저마다 스크랩 다르니까... 
    // const { id } = useParams(); 
    // navigate(`/${id}/scrap`);
    // const navigate = useNavigate();

    const handleFilterClick = (filterName: string) => {
        setActiveFilters((prev) =>
            prev.includes(filterName) ? prev.filter((name) => name !== filterName) : [...prev, filterName]
        );
    };
    const handleSearchClick = () => {

    };

    return (
        <div className='bg-white font-pretendard flex flex-col justify-between h-[114px] px-[24px]'>
            <div className='mt-[17px] flex flex-row justify-between'>
                <span className='text-black font-700 text-[22px]'>도감</span>
                <div className='flex flex-row gap-[31px]'>
                    <button onClick={() => handleFilterClick('스크랩')}>
                                {activeFilters.includes('스크랩') ? (
                                    <ScrapFilledIcon className="h-[21px] " />
                                ) : (
                                    <ScrapBlackIcon className="h-[21px] stroke-black " />
                                )}</button>
                    <button onClick={handleSearchClick}><SearchIcon className='h-[18.28px]'/></button>
                </div>
            </div>
            <div className='mb-[12px] flex gap-[12px]'>
                <button className={`gap-[5px] flex flex-row text-[15px] w-[70px] h-[33px] rounded-[100px] justify-center items-center ${activeFilters.includes('계절') ? 'bg-green text-[#fefefe] font-700': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('계절')}>
                                {activeFilters.includes('계절') ? (
                                    <CalendarFilledIcon className="w-[13px] h-[13px] " />
                                ) : (
                                    <CalendarIcon className="w-[13px] h-[13px] " />
                                )}
                    <span>계절</span>
                    </button>
                <button className={`gap-[5px] flex flex-row text-[15px] w-[83px] h-[33px] rounded-[100px] justify-center items-center ${activeFilters.includes('서식지') ? 'bg-green text-[#fefefe] font-700': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('서식지')}>
                                {activeFilters.includes('서식지') ? (
                                    <HabitatFilledIcon className="w-[13px] h-[11px] " />
                                ) : (
                                    <HabitatIcon className="w-[13px] h-[11px] " />
                                )}
                    <span>서식지</span>
                </button>                
                <button className={`gap-[5px] flex flex-row text-[15px] w-[72px] h-[33px] rounded-[100px] justify-center items-center ${activeFilters.includes('크기') ? 'bg-green text-[#fefefe] font-700 ': 'text-[#0d0d0d] font-400 bg-[#f2f2f2]'}`}
                        onClick={() => handleFilterClick('크기')}>
                                {activeFilters.includes('크기') ? (
                                    <SizeFilledIcon className="w-[15px] h-[10px] " />
                                ) : (
                                    <SizeIcon className="w-[15px] h-[10px] " />
                                )}
                    <span>크기</span>
                </button>
            </div>
        </div>
    )
}

// 이거 아이콘 컴포넌트 디자인인 수정 필요

export default DexHeader;


