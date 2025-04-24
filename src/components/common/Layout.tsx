import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw] font-pretendard ">
      <div className="mx-auto flex min-h-[100dvh] bg-[#F2F2F2] text-[#ffffff] max-w-[800px] flex-col shadow-xl">
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
