import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";

interface CollectionInfoProps {
    date: string;
    location: string;
    comment: string;
}

const CollectionInfo = ({date, location, comment}: CollectionInfoProps ) => {
    function handleShareClick(): void {
        throw new Error("Function not implemented.");
    }

    function handleToDexClick(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className='font-pretendard px-[24px] pt-[25px]'>
            <div className='flex flex-row justify-between items-center '>
                <span className='text-black font-600 text-[20px]'>관찰정보</span>
                <div className='flex flex-row gap-[10px]'>
                    <button onClick={() => handleToDexClick()} className='rounded-[8px] w-[88px] h-[33px] bg-green font-600 text-[15px] text-white '>도감 보기</button>
                    <button onClick={() => handleShareClick()} className='w-[33px] h-[33px] '><InstagramIcon/></button>
                </div>
            </div>
            <div className='mt-[8px] flex flex-col gap-[7px] text-[15px]'>
                <div className='gap-[14px] flex'>
                    <span className='font-400 text-[#979797] '>발견 일시</span>
                    <span className='font-600 text-[#0d0d0d] '>{date}</span>
                </div>
                <div className='gap-[14px] flex'>
                    <span className='font-400 text-[#979797]'>발견 장소</span>
                    <span className='font-600 text-[#0d0d0d]'>{location}</span>
                </div>
            </div>
            <div className='mt-[21px] rounded-[8px] w-full bg-[#f0f0f0] py-[14px] px-[18px] items-center font-400 text-[13px] text-[#0d0d0d] '>{comment}</div>
        </div>

    )

}

export default CollectionInfo;