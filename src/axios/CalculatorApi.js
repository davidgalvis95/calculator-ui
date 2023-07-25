import axios from "axios";

export const baseApiUrl = "/api/v1";
export const calculatorApiService = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}${baseApiUrl}`,
  responseType: "json",
});
