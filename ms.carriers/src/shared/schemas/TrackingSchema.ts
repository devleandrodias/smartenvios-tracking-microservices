import { ESmartEnviosStatus } from "../enuns/ESmartEnviosStatus";

export type TrackingEvent = {
  location: string;
  timestamp: string;
  status: ESmartEnviosStatus;
};

export type TrackingSchema = {
  orderId: string;
  carrier: string;
  trackingCode: string;
  events: TrackingEvent[];
};

export const trackingSchema = `
{
  "type": "record",
  "name": "TrackingSchema",
  "namespace": "tracking",
  "fields": [
    { "name": "carrier", "type": "string" },
    { "name": "orderId", "type": "string" },
    { "name": "trackingCode", "type": "string" },
    { "name": "events", 
      "type": { 
        "type": "array", 
        "items": {
          "name": "TrackingEvent",
          "type": "record",
          "namespace": "tracking",
          "fields": [
            { "name": "status", "type": "string" },
            { "name": "location", "type": "string" },
            { "name": "timestamp", "type": "string" }
          ]
        } 
      } 
    }
  ]
}
`;
