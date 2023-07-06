import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const ProfilePic = ({ size, src }: { size: string; src?: string }) => {
  const { user } = useContext(AuthContext);
  const widthClass = `w-${size}`;
  const heightClass = `h-${size}`;
  const router = useRouter();

  return (
    <div>
      {user?.img && (
        <img
          src={
            src
              ? src
              : user?.google_id
              ? user?.img
              : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${user?.img}`
          }
          referrerPolicy="no-referrer"
          alt="profile"
          className={`aspect-square  object-cover rounded-full ${widthClass} ${heightClass}
          
           ${router.route === "/profile" && "border-2 border-red-500"}`}
        />
      )}
    </div>
  );
};

export default ProfilePic;
