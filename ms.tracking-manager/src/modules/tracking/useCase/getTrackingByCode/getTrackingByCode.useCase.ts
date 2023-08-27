import { ITracking } from "../../entities/ITracking";
import { IGetTrackingByCodeInput } from "./getTrackingByCode.interfaces";
import { TrackingRepository } from "../../infra/typeorm/repositories/tracking.repository";

export class GetTrackingByCodeUseCase {
  async execute(input: IGetTrackingByCodeInput): Promise<ITracking> {
    const repository = new TrackingRepository();

    const tracking = await repository.getTrackingByCode(input.trackingCode);

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    return tracking;
  }
}
