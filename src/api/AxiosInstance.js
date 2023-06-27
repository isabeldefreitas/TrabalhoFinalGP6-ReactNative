import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://192.168.68.109:8080/api",
});

export default AxiosInstance;
