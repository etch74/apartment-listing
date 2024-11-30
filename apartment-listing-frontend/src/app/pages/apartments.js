// pages/api/apartments.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";  // Replace with your backend URL

export const fetchApartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/apartments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return [];
  }
};
