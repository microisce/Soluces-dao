import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.100.15:8000/api/",
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

export default ApiManager;
