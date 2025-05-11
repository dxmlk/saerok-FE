import { ReactNode } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as CommunityIcon } from "assets/icons/nav-community.svg";
import { ReactComponent as DexIcon } from "assets/icons/nav-dex.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav-map.svg";
import { ReactComponent as SaerokIcon } from "assets/icons/nav-saerok.svg";
import { ReactComponent as MyIcon } from "assets/icons/nav-my.svg";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="relative min-h-[100dvh] w-[100dvw]">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[500px] flex-col bg-white shadow-xl">
        <div className="flex-grow">
          <Outlet />
        </div>
        <nav
          className=" rounded-t-[20px] border-none fixed bottom-0 left-0 right-0 mx-auto flex h-60 max-w-[500px] items-center bg-white"
          style={{ boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <button className="flex-1 flex flex-col items-center text-[#6D6D6D]">
            <CommunityIcon className="w-[19px] h-[19px]" />
            <div className="text-[13px] mt-[7px]">커뮤니티</div>
          </button>
          <button
            onClick={() => navigate("/dex")}
            className={`flex-1 flex flex-col items-center ${isActive("/dex") ? "text-green" : "text-[#6d6d6d]"}`}
          >
            <DexIcon className="w-[22px] h-[19px]" />
            <div className="text-[13px] mt-[7px]">도감</div>
          </button>
          <button
            onClick={() => navigate("/map")}
            className={`flex-1 flex flex-col items-center ${isActive("/map") ? "text-green" : "text-[#6d6d6d]"}`}
          >
            <MapIcon className="w-[20px] h-[20px]" />
            <div className="text-[13px] mt-[7px]">지도</div>
          </button>
          <button
            onClick={() => navigate("/collection")}
            className={`flex-1 flex flex-col items-center ${isActive("/collection") ? "text-green" : "text-[#6d6d6d]"}`}
          >
            <SaerokIcon className="w-[22px] h-[20px]" />
            <div className="text-[13px] mt-[7px]">새록</div>
          </button>
          <button
            onClick={() => navigate("/my-page")}
            className={`flex-1 flex flex-col items-center ${isActive("/my-page") ? "text-green" : "text-[#6d6d6d]"}`}
          >
            <MyIcon className="w-[17px] h-[20px]" />
            <div className="text-[13px] mt-[7px]">MY</div>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
