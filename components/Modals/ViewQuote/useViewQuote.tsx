import { AuthContext } from "context/AuthContext";
import { useContext } from "react";

const useViewQuote = () => {
  const { user } = useContext(AuthContext);

  return { user };
};

export default useViewQuote;
