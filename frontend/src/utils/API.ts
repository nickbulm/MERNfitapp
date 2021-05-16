import axios from "axios";

const getToken = () => localStorage.getItem("jwtToken");

export const API = axios.create({
  baseURL: "http://127.0.0.1:4000/api",
  responseType: "json",
  headers: { Authorization: `${getToken()}` },
});