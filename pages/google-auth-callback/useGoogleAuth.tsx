import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axiosAPI from "lib/axios";
import { AuthContext } from "context/AuthContext";
import Cookies from "js-cookie";

const useGoogleAuth = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const asPath = { path: router.asPath.slice(21).toString() };

    axiosAPI
      .get("/auth/callback?" + asPath.path)
      .then(({ data }) => {
        Cookies.set("user-email", data.user.email, { expires: 120 });
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        router.push("/");
      });
  }, []);

  return {};
};

export default useGoogleAuth;
