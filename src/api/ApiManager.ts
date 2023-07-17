import axios from "axios";

const ApiManager = axios.create({
  baseURL: "https://erp-demo-v1.ismaeland.com/api/",
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

export default ApiManager;
