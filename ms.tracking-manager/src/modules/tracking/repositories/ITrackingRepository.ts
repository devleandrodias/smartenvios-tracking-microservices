import { ITracking } from "../entities/ITracking";

export interface ISaveOrderTrackingInput {
  orderId: string;
  trackingCode: string;
  shippingCompany: string;
}

export interface ITrackingRepository {
  addTrackingEvent(): Promise<ITracking>;
  saveOrderTracking(input: ISaveOrderTrackingInput): Promise<ITracking>;
  getTrackingByCode(trackingCode: string): Promise<ITracking | null>;
}
