import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { useNavigate } from "react-router-dom";

interface SaerokInfoProps {
  date: string;
  lat: number;
  long: number;
  locationAlias: string;
  note: string;
  birdInfo: {
    birdId: number | null;
    koreanName: string | null;
    scientificName: string | null;
  };
}

const SaerokInfo = ({ date, lat, long, locationAlias, note, birdInfo }: SaerokInfoProps) => {
  const navigate = useNavigate();

  const handleToDexClick = () => {
    if (birdInfo.birdId !== null) {
      navigate(`/dex-detail/${birdInfo.birdId}`);
    } else {
      alert("도감 정보가 없는 새입니다.");
    }
  };

  const handleShareClick = () => {
    alert("공유 기능은 아직 구현되지 않았습니다.");
  };

  return (
    <div className="font-pretendard px-[24px] pt-[25px]">
      <div className="flex flex-row justify-between items-center">
        <span className="text-black font-600 text-[20px]">관찰정보</span>
        <div className="flex flex-row gap-[10px]">
          <button
            onClick={handleToDexClick}
            className="rounded-[8px] w-[88px] h-[33px] bg-green font-600 text-[15px] text-white"
          >
            도감 보기
          </button>
          <button onClick={handleShareClick} className="w-[33px] h-[33px]">
            <InstagramIcon />
          </button>
        </div>
      </div>

      <div className="mt-[8px] flex flex-col gap-[7px] text-[15px]">
        <div className="gap-[14px] flex">
          <span className="font-400 text-[#979797]">발견 일시</span>
          <span className="font-600 text-[#0d0d0d]">{date}</span>
        </div>
        <div className="gap-[14px] flex">
          <span className="font-400 text-[#979797]">발견 장소</span>
          <span className="font-600 text-[#0d0d0d]">{locationAlias}</span>
        </div>
        <div className="gap-[14px] flex">
          <span className="font-400 text-[#979797]">위도/경도</span>
          <span className="font-600 text-[#0d0d0d]">
            {lat.toFixed(5)}, {long.toFixed(5)}
          </span>
        </div>
        {birdInfo.koreanName && (
          <div className="gap-[14px] flex">
            <span className="font-400 text-[#979797]">새 이름</span>
            <span className="font-600 text-[#0d0d0d]">{birdInfo.koreanName}</span>
          </div>
        )}
        {birdInfo.scientificName && (
          <div className="gap-[14px] flex">
            <span className="font-400 text-[#979797]">학명</span>
            <span className="font-600 text-[#0d0d0d] italic">{birdInfo.scientificName}</span>
          </div>
        )}
      </div>

      <div className="mt-[21px] rounded-[8px] w-full bg-[#f0f0f0] py-[14px] px-[18px] font-400 text-[13px] text-[#0d0d0d]">
        {note || "기록된 한 줄 평이 없습니다."}
      </div>
    </div>
  );
};

export default SaerokInfo;
