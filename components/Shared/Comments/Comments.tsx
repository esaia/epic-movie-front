import { User } from "global";
import React from "react";

interface commentsProps {
  user: User;
  comment: string;
}
const Comments = ({ user, comment }: commentsProps) => {
  return (
    <div className="flex gap-4 py-4 text-left">
      <img
        src={
          user?.google_id
            ? user?.img
            : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${user?.img}`
        }
        alt="profile"
        className="aspect-square w-10 h-10 object-cover rounded-full "
      />
      <div className="w-full">
        <h3 className="font-bold">{user.name}</h3>
        <p className="border-b border-gray-600 pb-4">{comment}</p>
      </div>
    </div>
  );
};

export default Comments;
