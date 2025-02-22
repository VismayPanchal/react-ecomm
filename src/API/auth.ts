import axios from "axios";
import { API_URL } from "./config";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Signup failed. Please try again.");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
