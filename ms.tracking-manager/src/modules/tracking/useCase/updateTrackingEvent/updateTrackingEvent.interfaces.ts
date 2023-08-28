import { ESmartEnviosStatus } from "../../../../shared/enuns/ESmartEnviosStatus";

export type ITrackingEvent = {
  observation: string;
  trackingId: string;
  status: ESmartEnviosStatus;
};

export interface IUpdateTrackingEventInput {
  shippingCompany: string;
  trackingCode: string;
  events: ITrackingEvent[];
}
