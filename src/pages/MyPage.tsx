import { useSearchParams } from "react-router-dom";
import { useUser } from "hooks/useUser";

import { ReactComponent as LogoIcon } from "assets/background/logo-cut.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";
import { ReactComponent as DocumentIcon } from "assets/icons/icon/document.svg";
import { ReactComponent as BellIcon } from "assets/icons/icon/bell.svg";
import { ReactComponent as EggIcon } from "assets/icons/icon/egg.svg";
import { ReactComponent as LockIcon } from "assets/icons/icon/lock.svg";
import { ReactComponent as NoticeIcon } from "assets/icons/icon/notice.svg";

import MenuItem from "features/mypage/components/MenuItem";
import Profile from "features/mypage/components/Profile";

import AccountPage from "features/mypage/pages/AccountPage";
import FeedbackPage from "features/mypage/pages/FeedbackPage";
import GuidgePage from "features/mypage/pages/GuidePage";
import PublicSettingPage from "features/mypage/pages/PublicSettingPage";
import PrivacyPage from "features/mypage/pages/PrivacyPage";
import VersionPage from "features/mypage/pages/VersionPage";
import EditNicknamePage from "features/mypage/pages/EditNicknamePage";

const MyPage = () => {
  const [params, setParams] = useSearchParams();
  const current = params.get("page");

  const { user, isLoggedIn, loading } = useUser();

  const renderPage = () => {
    switch (current) {
      case "account":
        return <AccountPage />;
      case "feedback":
        return <FeedbackPage />;
      case "guide":
        return <GuidgePage />;
      case "public":
        return <PublicSettingPage />;
      case "privacy":
        return <PrivacyPage />;
      case "version":
        return <VersionPage />;
      case "nickname":
        return <EditNicknamePage />;
      default:
        return null;
    }
  };

  const isSubPage = current !== null;

  if (loading) return <div className="p-24 text-body-1">로딩 중...</div>;
  if (isSubPage) return renderPage();

  return (
    <div className="relative bg-white w-full min-h-[100dvh] overflow-hidden">
      {/* 배경 */}
      <LogoIcon className="absolute right-0 top-0 z-0" />

      {/* 프로필 */}
      <div className="px-24 mt-20 z-10 relative">
        <Profile
          isUser={isLoggedIn}
          nickname={user?.nickname}
          joinedDate={user?.joinedDate}
          onClick={() => setParams({ page: "nickname" })}
        />
      </div>

      {/* 메뉴 */}
      <div className="flex flex-col justify-start gap-16 px-24 mt-24">
        {isLoggedIn && (
          <MenuItem
            icon={<UserIcon />}
            content={<span>내 계정 관리</span>}
            isActive
            onClick={() => setParams({ page: "account" })}
          />
        )}
        <MenuItem
          icon={<DocumentIcon />}
          content={<span>의견 보내기</span>}
          isActive
          onClick={() => setParams({ page: "feedback" })}
        />
        <MenuItem
          icon={<BellIcon />}
          content={<span>새록 소식 / 이용 가이드</span>}
          isActive
          onClick={() => setParams({ page: "guide" })}
        />
        {isLoggedIn && (
          <MenuItem
            icon={<EggIcon />}
            content={<span>새록 공개 설정</span>}
            isActive
            onClick={() => setParams({ page: "public" })}
          />
        )}
        <MenuItem
          icon={<LockIcon />}
          content={<span>개인정보 처리 방침</span>}
          isActive
          onClick={() => setParams({ page: "privacy" })}
        />
        <MenuItem
          icon={<NoticeIcon />}
          content={<span>버전 정보</span>}
          isActive
          onClick={() => setParams({ page: "version" })}
        />
      </div>
    </div>
  );
};

export default MyPage;
