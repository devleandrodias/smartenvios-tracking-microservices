import { Document } from "mongoose";

export interface IEvent {
  status: string;
  location: string;
  timestamp: string;
}

export interface ITracking extends Document {
  orderId: string;
  carrier: string;
  trackingCode: string;
  events: IEvent[];
}
