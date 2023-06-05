import Link from "next/link";
import { BsHouseDoor, BsCameraReels } from "react-icons/bs";
import useSidebar from "./useSidebar";
import { ProfilePic } from "@/components";

const Sidebar = () => {
  const { router, user } = useSidebar();
  return (
    <div>
      <div className="flex items-center gap-5 ">
        <ProfilePic size="12" />

        <Link href={"/profile"}>
          <div>
            <h2 className="text-md ">{user?.name}</h2>
            <p className="text-xs text-gray-100">Edit your profile</p>
          </div>
        </Link>
      </div>

      <Link href={"/"}>
        <div className="flex items-center gap-4 my-9 text-md cursor-pointer text-md mt-10">
          <BsHouseDoor
            className={`text-2xl ${router.route === "/" && "text-red-600"}`}
          />
          <p>News feed</p>
        </div>
      </Link>
      <Link href={"/movies"}>
        <div className="flex items-center gap-4 my-9 text-md cursor-pointer text-md">
          <BsCameraReels
            className={`text-2xl ${
              router.route === "/movies" && "text-red-600"
            }`}
          />
          <p>List of movies</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
