import axios from "axios";

const API_URL = "http://localhost:3900/api"

 axios.defaults.baseURL = API_URL;

export function setCommonHeader(key, value) {
  axios.defaults.headers.common[key] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setCommonHeader
}; 

export default httpService;
