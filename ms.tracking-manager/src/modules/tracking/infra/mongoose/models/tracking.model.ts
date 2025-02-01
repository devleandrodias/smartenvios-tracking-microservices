import mongoose, { Schema } from "mongoose";

import { ITracking } from "../../../entities/ITracking";

const TrackingSchema: Schema = new Schema(
  {
    orderId: { type: String, require: true },
    carrier: { type: String, required: true },
    trackingCode: { type: String, required: true },
    events: [
      {
        timestamp: { type: Date, required: true },
        status: { type: String, required: true },
        location: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const TrackingModel = mongoose.model<ITracking>("Tracking", TrackingSchema);

export { TrackingModel, TrackingSchema };
