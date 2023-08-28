import { ESmartEnviosStatus } from "../enuns/ESmartEnviosStatus";

export type TrackingEvent = {
  observation: string;
  status: ESmartEnviosStatus;
};

export type TrackingSchema = {
  trackingCode: string;
  shippingCompany: string;
  events: TrackingEvent[];
};

export const trackingSchema = `
{
  "type": "record",
  "name": "TrackingSchema",
  "namespace": "tracking",
  "fields": [
    { "name": "trackingCode", "type": "string" },
    { "name": "shippingCompany", "type": "string" },
    { "name": "events", 
      "type": { 
        "type": "array", 
        "items": {
          "name": "TrackingEvent",
          "type": "record",
          "namespace": "tracking",
          "fields": [
            { "name": "observation", "type": "string" },
            { "name": "status", "type": "string" }
          ]
        } 
      } 
    }
  ]
}
`;
