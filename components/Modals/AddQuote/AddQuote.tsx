import { AiOutlineCamera } from "react-icons/ai";

const AddQuote = () => {
  return (
    <div className="w-full text-center h-screen md:h-fit md:max-h-[90vh] ">
      <h2 className="py-3 border-b border-gray-600 text-xl">Add Quote</h2>

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
        <div className="flex gap-2 items-start text-sm">
          <img
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
            alt="profile"
            className="w-60 h-32 rounded-md object-cover"
          />
          <div className="flex  flex-col gap-3 min-w-[100px] text-left">
            <h2 className="text-orange-200">COMMITMENT HASAN (1999)</h2>
            <div className="flex items-center">
              <p className="py-1 px-3 bg-gray-500 text-white w-fit text-sm rounded-md ">
                Drama
              </p>
            </div>

            <div className="flex items-center gap-2 ">
              <p className="text-gray-200 ">DIRECTOR: </p>
              <p>NICK CASSAVETES</p>
            </div>
          </div>
        </div>

        <div className="relative w-full  border border-gray-600 rounded-md my-6">
          <p className="absolute right-2 top-1 text-gray-400">eng</p>

          <textarea
            className="w-full outline-none bg-transparent placeholder:italic p-2 "
            placeholder="quote..."
          ></textarea>
        </div>

        <div className="relative w-full  border border-gray-600 rounded-md">
          <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

          <textarea
            className="w-full outline-none bg-transparent placeholder:italic p-2 "
            placeholder="ციტატა..."
          ></textarea>
        </div>

        <div className="w-full border border-gray-600 rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md my-5">
          <AiOutlineCamera className="text-xl min-w-[30px]" />
          <p>Drag & drop your image here or</p>
          <label
            htmlFor="file"
            className="px-2 py-1 bg-purple-900 cursor-pointer"
          >
            Choose file
          </label>
          <input id="file" type="file" className="hidden" />
        </div>

        <button className="w-full py-1 bg-red-600">Add quote</button>
      </div>
    </div>
  );
};

export default AddQuote;
