import { ReactComponent as  CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as  CalendarFilledIcon } from 'assets/icons/calendarfilled.svg';
import { ReactComponent as  HabitatIcon } from 'assets/icons/habitat.svg';
import { ReactComponent as  HabitatFilledIcon } from 'assets/icons/habitatfilled.svg';
import { ReactComponent as  SizeIcon } from 'assets/icons/size.svg';
import { ReactComponent as  SizeFilledIcon } from 'assets/icons/sizefilled.svg';

interface FilterHeaderProps {
    activeFilters: string[];
    handleFilterClick: (filterName: string) => void;
}

const FilterHeader = ({activeFilters, handleFilterClick}: FilterHeaderProps) => {
    return (
        <>
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
        </>
    )

}
export default FilterHeader;