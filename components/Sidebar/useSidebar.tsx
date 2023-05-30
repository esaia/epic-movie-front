import { useRouter } from "next/router";

const useSidebar = () => {
  const router = useRouter();

  return { router };
};

export default useSidebar;
