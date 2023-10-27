import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "https://atwsn2291:5250" : "https://api.robinerlacher.online";

export default axios.create({
  baseURL: BASE_URL,
});
