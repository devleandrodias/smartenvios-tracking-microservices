export enum ETrackingStatus {
  COLETADO = "COLETADO",
}

export type TrackingEvent = {
  description: string;
  status: ETrackingStatus;
};

export interface IUpdateTrackingEventInput {
  trackingCode: string;
  shippingCompany: string;
  events: TrackingEvent[];
}
