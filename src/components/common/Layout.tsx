import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw] ">
      <div className="mx-auto flex min-h-[100dvh] bg-[#000000] text-[#ffffff] max-w-[800px] flex-col shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
