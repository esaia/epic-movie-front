import Echo from "laravel-echo";
import Pusher from "pusher-js";

const pusher = new Pusher("dacee3f73dd01164fcff", {
  cluster: "ap2",
  forceTLS: true,
});

const echo = new Echo({
  broadcaster: "pusher",
  client: pusher,
});

export default echo;
