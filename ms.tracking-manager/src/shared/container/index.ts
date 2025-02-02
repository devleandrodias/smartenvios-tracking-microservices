import "reflect-metadata";

import { container } from "tsyringe";

import { ITrackingRepository } from "../../modules/tracking/repositories/ITrackingRepository";
import { TrackingRepository } from "../../modules/tracking/infra/mongoose/repositories/tracking.repository";

container.registerSingleton<ITrackingRepository>(
  "TrackingRepository",
  TrackingRepository
);
