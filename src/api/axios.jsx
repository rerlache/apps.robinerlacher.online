import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "https://papstal-lan:5250" : "https://api.robinerlacher.online";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
