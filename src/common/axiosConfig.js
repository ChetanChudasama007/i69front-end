import axios from "axios";

let apiBaseURL;
if (`${process.env.NEXT_PUBLIC_APP_ENV}` === "development") {
  apiBaseURL = process.env.NEXT_PUBLIC_STAGING;
} else {
  apiBaseURL = process.env.NEXT_PUBLIC_PRODUCTION;
}

const axiosConfig = axios.create({
  baseURL: apiBaseURL,
});

export default axiosConfig;
