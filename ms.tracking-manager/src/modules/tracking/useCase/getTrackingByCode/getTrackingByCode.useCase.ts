import { inject, injectable } from "tsyringe";

import { ITracking } from "../../entities/ITracking";
import { IGetTrackingByCodeInput } from "./getTrackingByCode.dtos";
import { ITrackingRepository } from "../../repositories/ITrackingRepository";

@injectable()
export class GetTrackingByCodeUseCase {
  constructor(
    @inject("TrackingRepository") private repository: ITrackingRepository
  ) {}

  async execute(input: IGetTrackingByCodeInput): Promise<ITracking> {
    const tracking = await this.repository.getTrackingByCode(
      input.trackingCode
    );

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    return tracking;
  }
}
