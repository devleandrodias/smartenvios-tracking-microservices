import { ITracking, ITrackingEvent } from "../entities/ITracking";

export interface ISaveOrderTrackingInput {
  orderId: string;
  trackingCode: string;
  shippingCompany: string;
}

export interface ITrackingRepository {
  saveOrderTracking(input: ISaveOrderTrackingInput): Promise<ITracking>;
  getTrackingByCode(trackingCode: string): Promise<ITracking | null>;
  addTrackingEvent(
    trackingCode: string,
    events: ITrackingEvent[]
  ): Promise<void>;
}
