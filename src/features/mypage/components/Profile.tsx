import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/image/profile.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import LoginButton from "components/common/button/LoginButton.js";

interface ProfileProps {
  isUser: boolean;
  nickname?: string;
  joinedDate?: string;
  onClick: () => void;
}

const Profile = ({ isUser, nickname, joinedDate, onClick }: ProfileProps) => {
  const getDaysSinceJoin = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      {!isUser && (
        <div className="pt-47 pb-24 flex flex-col gap-16 font-pretendard">
          <div className="flex flex-row gap-11 justify-start items-center">
            <div className="w-30 h-30 rounded-full border-2 border-mainBlue bg-white flex items-center justify-center">
              <ExclamationIcon className="fill-mainBlue w-8" />
            </div>
            <div className="text-body-2 text-font-black flex flex-col justify-start gap-0">
              <div>현재 비회원으로 사용 중이에요.</div>
              <div>로그인하시겠어요?</div>
            </div>
          </div>
          <LoginButton />
        </div>
      )}

      {isUser && (
        <div className="pt-18 pb-11 flex flex-col gap-16 font-pretendard">
          <ProfileIcon className="w-61 h-61" />
          <div>
            <div className="flex flex-row gap-4">
              <div className="font-bold text-30">{nickname}</div>
              <button onClick={onClick} className="cursor-pointer">
                <EditIcon className="w-24 h-24 stroke-font-mainBlue" />
              </button>
            </div>
            <div className="text-caption-1 text-font-darkgray">새록과 함께한지 +{getDaysSinceJoin(joinedDate!)}일</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
