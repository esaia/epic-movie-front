import React from "react";

interface commentsProps {
  name: string;
  comment: string;
}
const Comments = ({ name, comment }: commentsProps) => {
  return (
    <div className="flex gap-4 py-4">
      <img
        src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
        alt="profile"
        className="aspect-square w-10 h-10 object-cover rounded-full "
      />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="border-b border-gray-600 pb-4">{comment}</p>
      </div>
    </div>
  );
};

export default Comments;
