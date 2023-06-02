import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Veirfy = () => {
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const url = router.query.url + "&signature=" + router.query.signature;

      try {
        await axios.get(url);
        router.push("/landing?modal=account-activation");
      } catch (error) {
        console.error(error);
        router.push("/landing?modal=expired");
      }
    };

    verify();
  }, [router]);

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

export default Veirfy;
