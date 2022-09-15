import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: true,
});


export const getUser = () => API.get(`/user/getUser`);
export const checkIn = () => API.patch(`/user/checkIn`);