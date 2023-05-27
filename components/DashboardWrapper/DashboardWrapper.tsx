import { NewsFeedHeader, Sidebar } from "@/components";
import { ReactNode } from "react";

interface DashboardWrapperProps {
  children: ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <div className="bg-background  text-white  min-h-screen">
      <NewsFeedHeader />
      <div className="pt-16"></div>

      <div className="grid md:grid-cols-column2 xl:grid-cols-column3  px-7  max-w-[1920px] m-auto ">
        <div className="py-5 hidden md:block min-w-[200px]  ">
          <Sidebar />
        </div>

        <div className="py-5  max-w-[650px] text-white  justify-self-center w-full  ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
