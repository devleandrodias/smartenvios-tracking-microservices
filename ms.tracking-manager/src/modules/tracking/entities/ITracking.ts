import { ESmartEnviosStatus } from "../../../shared/enuns/ESmartEnviosStatus";

export type ITrackingEvent = {
  observation: string;
  tracking?: ITracking;
  trackingId: string;
  status: ESmartEnviosStatus;
};

export interface ITracking {
  id: string;
  orderId: string;
  shippingCompany: string;
  trackingCode: string;
  events: ITrackingEvent[];
}
