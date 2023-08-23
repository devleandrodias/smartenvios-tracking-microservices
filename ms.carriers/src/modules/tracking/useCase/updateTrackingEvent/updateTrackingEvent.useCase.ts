import { carrierApi } from "../../../../api/api";
import { envs } from "../../../../config/env.config";
import { CarrierServices } from "../../../../services/carrier.services";

export class UpdateTrackingEventUseCase {
  private readonly _carrierService: CarrierServices;

  constructor() {
    this._carrierService = new CarrierServices();
  }

  async execute() {
    const trackingCode = "SM82886187440BM";

    const tracking = await this._carrierService.getTrackingByTrackingCode({
      trackingCode,
    });
  }
}
