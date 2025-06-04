import { ReactComponent as LogoIcon } from "assets/background/logo.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";
import { ReactComponent as DocumentIcon } from "assets/icons/icon/document.svg";
import { ReactComponent as BellIcon } from "assets/icons/icon/bell.svg";
import { ReactComponent as EggIcon } from "assets/icons/icon/egg.svg";
import { ReactComponent as LockIcon } from "assets/icons/icon/lock.svg";
import { ReactComponent as NoticeIcon } from "assets/icons/icon/notice.svg";
import MenuItem from "features/mypage/components/MenuItem";
import Profile from "features/mypage/components/Profile";

const MyPage = () => {
  const isUser = false;

  return (
    <>
      <div className="relative bg-white min-h-[100dvh]">
        {/* 배경 */}
        <LogoIcon className="absolute bottom-640 left-216 fill-mainBlueLight w-264 h-292 z-0" />

        {/* 프로필 - 나중에 로그인 되어 있는지, 아닌지로 나누어야 할 듯 */}
        <div className="px-24 mt-20 z-10 relative">
          <Profile isUser={isUser} />
        </div>

        {/* 버튼 리스트 */}
        <div className="flex flex-col justify-start gap-16 px-24 mt-24">
          <MenuItem icon={<UserIcon />} content={<span>내 계정 관리</span>} isActive={isUser ? true : false} />
          <MenuItem icon={<DocumentIcon />} content={<span>의견 보내기</span>} isActive={true} />
          <MenuItem icon={<BellIcon />} content={<span>새록 소식 / 이용 가이드</span>} isActive={true} />
          <MenuItem icon={<EggIcon />} content={<span>새록 공개 설정</span>} isActive={isUser ? true : false} />
          <MenuItem icon={<LockIcon />} content={<span>개인정보 처리 방침</span>} isActive={true} />
          <MenuItem icon={<NoticeIcon />} content={<span>버전 정보</span>} isActive={true} />
        </div>
      </div>
    </>
  );
};

export default MyPage;
