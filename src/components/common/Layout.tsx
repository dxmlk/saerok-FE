import { Outlet, useLocation } from "react-router-dom";
import { ReactComponent as DexIcon } from "assets/icons/nav/dex.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as SaerokIcon } from "assets/icons/nav/saerok.svg";
import { ReactComponent as MyIcon } from "assets/icons/nav/my.svg";
import NavButton from "./button/NavButton";

const Layout = () => {
  const location = useLocation();

  const hideNavBar = ["/add-collection"].some((path) => location.pathname.startsWith(path));

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="relative min-h-[100dvh] w-[100dvw] font-pretendard ">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-500 flex-col bg-white shadow-xl justify-center">
        <div className="flex-grow">
          <Outlet />
        </div>

        {!hideNavBar && (
          <nav
            className="shadow-[0_0px_15px_0_rgba(0,0,0,0.15)]
             bg-background-white h-76 absolute bottom-20 rounded-full flex items-center px-44 py-16 justify-between "
            style={{
              width: "calc(100% - 4rem)",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <NavButton to="/dex" label="도감" Icon={DexIcon} isActive={isActive("/dex")} />
            <NavButton to="/map" label="지도" Icon={MapIcon} isActive={isActive("/map")} />
            <NavButton to="/collection" label="새록" Icon={SaerokIcon} isActive={isActive("/collection")} />
            <NavButton to="/my-page" label="MY" Icon={MyIcon} isActive={isActive("/my-page")} />
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
