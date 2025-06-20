import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";

interface SaerokInfoProps {
  img: string | null;
  date: string;
  address: string;
  locationAlias: string;
  note: string;
  birdInfo: {
    birdId: number | null;
    koreanName: string | null;
    scientificName: string | null;
  };
  user: {
    userId: number;
    nickname: string;
  };
}

const SaerokInfo = ({ img, date, address, locationAlias, note, birdInfo, user }: SaerokInfoProps) => {
  function formatDate(dateString: string) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month}월 ${day}일`;
  }
  return (
    <>
      <div className="relative w-full h-auto z-0">
        <img src={img ?? ""} className="w-full h-auto object-cover" />
        <div className="bg-[linear-gradient(180deg,rgba(254,254,254,0)_0%,rgba(254,254,254,1)_100%)] absolute w-full h-84 bottom-0"></div>
        <div className="absolute left-24 -bottom-28 [filter:drop-shadow(0_0px_10px_rgba(0,0,0,0.15))] px-20 py-12 items-center justify-center flex flex-row gap-7 bg-background-white rounded-20">
          <span className="text-headline-2 font-moneygraphy">{birdInfo.koreanName}</span>
          <span className="text-body-2 text-font-darkgray">{birdInfo.scientificName}</span>
        </div>
      </div>
      <div className="font-pretendard px-24 flex flex-col">
        <div className="w-full bg-background-whitegray rounded-10 px-26 pt-32 pb-20 break-words whitespace-pre-line">
          {note}
        </div>
        <div className="mt-28 flex flex-row gap-10 justify-start items-center">
          <MapIcon className="w-24 h-24 text-font-pointYellow" />
          <div className="flex flex-col gap-1">
            <span className="text-subtitle-3 text-font-black">{locationAlias}</span>
            <span className="text-caption-1 text-font-darkgray">{address}</span>
          </div>
        </div>
        <div className="mt-20 flex flex-row gap-10 justify-start items-center">
          <MapIcon className="w-24 h-24 text-font-pointYellow" />
          <span className="text-subtitle-3 text-font-black">{formatDate(date)}</span>
        </div>
        <div className="mt-28 flex flex-row gap-10 justify-start items-center">
          <UserIcon className="w-24 h-24 text-font-pointYellow" />
          <span className="text-subtitle-3 text-font-black">{user?.nickname ?? "알 수 없음"}</span>
        </div>
      </div>
    </>
  );
};

export default SaerokInfo;
