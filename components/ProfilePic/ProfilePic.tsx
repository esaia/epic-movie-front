import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";

const ProfilePic = ({ size }: { size: string }) => {
  const { user } = useContext(AuthContext);
  const widthClass = `w-${size}`;
  const heightClass = `h-${size}`;

  return (
    <div>
      {user?.img && (
        <img
          src={
            user?.google_id
              ? user?.img
              : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${user?.img}`
          }
          referrerPolicy="no-referrer"
          alt="profile"
          className={`aspect-square  object-cover rounded-full ${widthClass} ${heightClass}`}
        />
      )}
    </div>
  );
};

export default ProfilePic;
