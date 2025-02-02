import { msTrackingApi } from "@/shared/api/msTracking.api";

type TrackingEvent = {
  _id: string;
  orderId: string;
  carrier: string;
  trackingCode: string;
  events: [
    {
      timestamp: string;
      status: string;
      location: string;
      _id: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  __v: 1;
};

export const getTrackingEvents = async (trackingCode: string) => {
  try {
    const url = `/${trackingCode}`;
    const response = await msTrackingApi.get<TrackingEvent>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting tracking events");
  }
};
