import Axios from "axios";

export const trackingManagerApi = Axios.create({
  baseURL: "http://localhost:4000",
});

export const getTrackingByCode = async (trackingCode: string) => {
  return (await trackingManagerApi.get(`/${trackingCode}`)).data;
};
