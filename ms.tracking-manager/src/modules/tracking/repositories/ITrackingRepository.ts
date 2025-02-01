import { ITracking, IEvent } from "../entities/ITracking";
import { ICreateOrderTrackingInput } from "../useCase/createOrderTracking/createOrderTracking.interfaces";

export interface ITrackingRepository {
  saveOrderTracking(input: ICreateOrderTrackingInput): Promise<ITracking>;
  getTrackingNeedUpdate(): Promise<ITracking[]>;
  getTrackingByCode(trackingCode: string): Promise<ITracking | null>;
  addTrackingEvent(trackingCode: string, events: IEvent[]): Promise<void>;
}
