import { ITracking } from "../../entities/ITracking";
import { TrackingRepositoryInMemory } from "../../infra/inMemory/repositories/tracking.repository";
import {
  IGetTrackingInput,
  IGetTrackingOutput,
} from "./getTracking.interfaces";

export class GetTrackingUseCase {
  async execute(input: IGetTrackingInput): Promise<ITracking> {
    const repository = new TrackingRepositoryInMemory();

    const tracking = await repository.getTrackingByCode(input.trackingCode);

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    return tracking;
  }
}
