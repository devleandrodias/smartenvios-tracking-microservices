import { ESmartEnviosStatus } from "../../../../shared/enuns/ESmartEnviosStatus";

export type ITrackingEvent = {
  location: string;
  timestamp: string;
  status: ESmartEnviosStatus;
};

export interface IUpdateTrackingEventInput {
  carrier: string;
  trackingCode: string;
  events: ITrackingEvent[];
}
