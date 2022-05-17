import axios from "axios";
const header = {
  'x-api-key': `${process.env.API_KEY}`
}
const api = axios.create({
  baseURL:  `${process.env.API_HTTP}/`,
  headers: header
});

export default api;