import { AuthContext } from "context/AuthContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext } from "react";

const useSidebar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const t = useTranslations("Sidebar");

  return { router, user, t };
};

export default useSidebar;
