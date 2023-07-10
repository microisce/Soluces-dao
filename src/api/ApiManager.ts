import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://34.140.237.148:8000/api/",
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

export default ApiManager;
