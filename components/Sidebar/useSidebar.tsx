import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const useSidebar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return { router, user };
};

export default useSidebar;
