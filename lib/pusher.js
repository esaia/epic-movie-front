import Echo from "laravel-echo";
import Pusher from "pusher-js";

const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
  cluster: `${process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER}`,
  forceTLS: true,
});

const echo = new Echo({
  broadcaster: "pusher",
  client: pusher,
});

export default echo;
