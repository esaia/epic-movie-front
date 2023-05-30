import { BsTrash3 } from "react-icons/bs";

const EditQuote = () => {
  return (
    <div className="w-full text-center h-screen md:h-fit md:max-h-[90vh] ">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <BsTrash3 className="cursor-pointer" />
      </div>
      <h2 className="py-3 border-b border-gray-600 text-xl">Edit Quote</h2>

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
      <div className="m-5">
        <div className="relative w-full  border border-gray-600 rounded-md">
          <p className="absolute right-2 top-1 text-gray-400">eng</p>

          <textarea
            className="w-full outline-none bg-transparent placeholder:italic p-2 "
            placeholder="quote..."
          ></textarea>
        </div>
      </div>

      <div className="m-5">
        <div className="relative w-full  border border-gray-600 rounded-md">
          <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

          <textarea
            className="w-full outline-none bg-transparent placeholder:italic p-2 "
            placeholder="ციტატა..."
          ></textarea>
        </div>

        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="w-full h-72 object-cover my-7"
        />
        <button className="w-full py-1 bg-red-600">Save changes</button>
      </div>
    </div>
  );
};

export default EditQuote;
