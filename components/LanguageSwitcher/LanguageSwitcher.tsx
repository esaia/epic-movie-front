import { AiOutlineCaretDown } from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import useLanguageSwitcher from "./useLanguageSwitcher";

const LanguageSwitcher = () => {
  const {
    showLanguageDropDown,
    setShowLanguageDropDown,
    handleClickOutside,
    changeLanguage,
    locale,
    locales,
  } = useLanguageSwitcher();

  return (
    <div
      className="hidden w-10 md:flex justify-center items-center gap-2 cursor-pointer relative "
      onClick={() => setShowLanguageDropDown(true)}
    >
      <p className="text-white"> {locale}</p>
      <AiOutlineCaretDown className="text-white " />

      {showLanguageDropDown && (
        <div
          className="absolute  px-4 py-1 top-8 left-[50%] translate-x-[-50%] bg-gray-800 rounded-md text-white"
          onClick={(e) => changeLanguage(e)}
        >
          <OutsideClickHandler onOutsideClick={handleClickOutside}>
            <p>{locales?.find((localee) => localee !== locale)}</p>
          </OutsideClickHandler>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
