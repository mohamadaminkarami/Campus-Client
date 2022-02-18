import axios from "axios";
import config from "../config";

const {
  SERVER_API_URLS: { BASE_URL },
} = config;
const serverApi = axios.create({ baseURL: BASE_URL, timeout: 2000 });

export default serverApi;
