import axios from "axios";

const API = axios.create({
  baseURL: "http://your-backend-url",
});

export default API;
