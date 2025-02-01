import { injectable } from "tsyringe";

import { ITracking } from "../../entities/ITracking";
import { IGetTrackingByCodeInput } from "./getTrackingByCode.dtos";
import { TrackingRepository } from "../../infra/mongoose/repositories/tracking.repository";

@injectable()
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
