import Axios from "axios";

export const msTrackingApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_MS_TRACKING_API_URL,
});
