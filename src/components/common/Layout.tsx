import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-[100dvh] w-[100dvw]">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[500px] flex-col bg-white shadow-xl">{children}</div>
    </div>
  );
};

export default Layout;
