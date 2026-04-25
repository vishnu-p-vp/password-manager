import axios from "axios";

const API = axios.create({
  baseURL: "http://password-manager-alb-001-936983451.ap-south-1.elb.amazonaws.com",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;