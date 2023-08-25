import { ITracking } from "../entities/ITracking";

export interface ITrackingRepository {
  saveOrderTracking(): Promise<void>;
  addTrackingEvent(): Promise<ITracking>;
  getTrackingByCode(trackingCode: string): Promise<ITracking | undefined>;
}
