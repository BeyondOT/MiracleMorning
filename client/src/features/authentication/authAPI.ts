import axios from "axios";
import { UserLogin, UserRegister } from "./auth.types";

const API = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: true,
});

export const login = async (data: UserLogin) =>
  await API.post<string>(`/auth/login`, data);

export const register = async (data: UserRegister) =>
  await API.post<string>(`/auth/register`, data);

export const fetchToken = async () => await API.get<string>(`/auth/jwtid`);
