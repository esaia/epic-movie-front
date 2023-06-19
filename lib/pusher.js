import Echo from "laravel-echo";
import Pusher from "pusher-js";

const pusher = new Pusher("952ba749931dc1908908", {
  cluster: "ap2",
  forceTLS: true,
});

const echo = new Echo({
  broadcaster: "pusher",
  client: pusher,
});

export default echo;
