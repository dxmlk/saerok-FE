import { ReactComponent as  ScrapBlackIcon } from 'assets/icons/scrapblack.svg';
import { ReactComponent as ScrapFilledIcon} from 'assets/icons/scrapfilled.svg';
import { ReactComponent as  SearchIcon } from 'assets/icons/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterHeader from './FilterHeader';



const DexHeader = () => {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    
    // 나중에 유저 id도 받아야 돼 유저마다 스크랩 다르니까... 
    // const { id } = useParams(); 
    // navigate(`/${id}/scrap`);
    const navigate = useNavigate();

    const handleFilterClick = (filterName: string) => {
        setActiveFilters((prev) =>
            prev.includes(filterName) ? prev.filter((name) => name !== filterName) : [...prev, filterName]
        );
    };

    const handleSearchClick = () => {
        navigate(`/search`);
    }

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
                    <button onClick={handleSearchClick}><SearchIcon className='h-[18.28px] text-[#0d0d0d]'/></button>
                </div>
            </div>
            <FilterHeader activeFilters={activeFilters} handleFilterClick={handleFilterClick}/>
        </div>
    )
}

// 이거 아이콘 컴포넌트 디자인인 수정 필요

export default DexHeader;


