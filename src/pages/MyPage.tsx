import { ReactComponent as LogoIcon } from "assets/background/logo.svg";
import Profile from "features/mypage/components/Profile";

const MyPage = () => {
  return (
    <>
      <div className="relative bg-white min-h-[100dvh]">
        {/* 배경 */}
        <LogoIcon className="absolute bottom-08 left-216 fill-mainBlueLight w-264 h-292" />

        {/* 프로필 - 나중에 로그인 되어 있는지, 아닌지로 나누어야 할 듯 */}
        <div className="px-24 mt-104">
          <Profile />
        </div>

        {/* 버튼 리스트 */}
      </div>
    </>
  );
};

export default MyPage;
