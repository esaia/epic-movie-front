import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axiosAPI from "lib/axios";
import { AuthContext } from "context/AuthContext";
import Cookies from "js-cookie";

const GoogleAuthCallback = () => {
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

  return (
    <div className="h-screen w-full bg-background flex justify-center items-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
