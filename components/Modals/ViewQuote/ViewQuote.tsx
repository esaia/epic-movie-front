import { Comments } from "@/components";
import { VscComment } from "react-icons/vsc";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TfiPencil } from "react-icons/tfi";

const ViewQuote = () => {
  return (
    <div className="w-full text-center h-screen md:h-fit md:max-h-[90vh] ">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <TfiPencil className="cursor-pointer" />
        |
        <BsTrash3 className="cursor-pointer" />
      </div>
      <h2 className="py-3 border-b border-gray-600 text-xl">View Quote</h2>

      <div className="p-5">
        <div className="flex items-center gap-2  ">
          <img
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
            alt="profile"
            className="aspect-square w-10 h-10 object-cover rounded-full "
          />
          <p>Nino Tabagari</p>
        </div>
      </div>

      <div className="m-3">
        <div className="w-full flex  relative border border-b-gray-600 rounded-md px-3 py-1 mb-4 ">
          <p className="absolute right-3">Eng</p>
          <p>"Frankly, my dear, I don'tgive a damn."</p>
        </div>
        <div className="w-full flex  relative border border-b-gray-600 rounded-md px-3 py-1 mb-4 ">
          <p className="absolute right-3">ქარ</p>
          <p>“ციტატა ქართულ ენაზე”</p>
        </div>

        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="w-full h-72 rounded-md object-cover "
        />

        <div className="flex gap-4 mt-4 pb-3 mb-3">
          <div className="flex items-center gap-1">
            <p>3</p>
            <VscComment className="text-2xl" />
          </div>
          <div className="flex items-center gap-1">
            <p>10</p>
            <AiOutlineHeart className="text-2xl" />
          </div>
        </div>

        <Comments
          name="Nina Baldadze"
          comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
        />

        <div className="flex  gap-3 pb-7">
          <img
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
            alt="profile"
            className="aspect-square w-10 h-10 object-cover rounded-full "
          />
          <div className="bg-secondary w-full flex items-center rounded-md">
            <input
              type="text"
              placeholder="Write a comment"
              className="w-full px-5 py-2 bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuote;
