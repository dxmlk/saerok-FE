import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { ReactComponent as DexIcon } from "assets/icons/nav/dex.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as SaerokIcon } from "assets/icons/nav/saerok.svg";
import { ReactComponent as MyIcon } from "assets/icons/nav/my.svg";
import NavButton from "./button/NavButton";

const Layout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const path = location.pathname;
  const pageParam = searchParams.get("page");

  const hideNavBar =
    path === "/" || path === "/register" || path === "/add-saerok" || (path === "/mypage" && pageParam !== null);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="relative min-h-[100dvh] w-[100dvw] font-pretendard">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-500 flex-col bg-white shadow-xl justify-center">
        <div className="flex-grow">
          <Outlet />
        </div>

        {!hideNavBar && (
          <nav
            className="shadow-[0_0px_15px_0_rgba(0,0,0,0.15)] left-1/2 translate-x-[-50%] w-full fixed bottom-20 max-w-468 
             bg-background-white h-76 rounded-full flex items-center px-44 py-16 justify-between z-50 "
            style={{ width: "calc(100% - 2rem)" }}
          >
            <NavButton to="/saerok" label="새록" Icon={SaerokIcon} isActive={isActive("/saerok")} />
            <NavButton to="/dex" label="도감" Icon={DexIcon} isActive={isActive("/dex")} />
            <NavButton to="/map" label="지도" Icon={MapIcon} isActive={isActive("/map")} />
            <NavButton to="/mypage" label="마이" Icon={MyIcon} isActive={isActive("/mypage")} />
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
