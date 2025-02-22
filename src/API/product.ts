import axios from "axios";
import { API_URL } from "./config";

export const fetchAllProducts = async () => {
  return axios.get(`${API_URL}/products`);
};
