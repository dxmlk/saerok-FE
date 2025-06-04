import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/image/profile.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import { ReactComponent as LoginIcon } from "assets/icons/icon/login.svg";

interface ProfileProps {
  isUser: boolean;
}

const Profile = ({ isUser }: ProfileProps) => {
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
          <button className="rounded-30.5 bg-font-mainBlue w-168 h-44 flex items-center justify-center gap-3 cursor-pointer">
            <LoginIcon className=" w-24 h-24" />
            <div className="text-body-2 text-background-white">로그인 / 회원가입</div>
          </button>
        </div>
      )}

      {isUser && (
        <div className="pt-18 pb-11 flex flex-col gap-16 font-pretendard">
          <ProfileIcon className="w-61 h-61" />
          <div>
            <div className="flex flex-row gap-4">
              <div className="font-bold text-30">안암동새록마스터</div>
              <button className="cursor-pointer">
                <EditIcon className="w-24 h-24 stroke-font-mainBlue" />
              </button>
            </div>
            <div className="text-caption-1 text-font-darkgray">새록과 함께한지 +145일</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
