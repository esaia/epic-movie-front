import Echo from "laravel-echo";

const echo = new Echo({
  authEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL_API}/broadcasting/auth`,
  broadcaster: "pusher",
  key: "dacee3f73dd01164fcff",
  cluster: "ap2",
  forceTLS: true,
  // auth: {
  //   headers: {
  //     withCredentials: true,
  //   },
  // },
});

export default echo;
