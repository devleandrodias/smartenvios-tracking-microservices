import { TrackingRepositoryInMemory } from "../../infra/inMemory/repositories/tracking.repository";
import { TrackingRepository } from "../../infra/typeorm/repositories/tracking.repository";
import { ICreateOrderTrackingInput } from "./createOrderTracking.interfaces";

export class CreateOrderTrackingUseCase {
  async execute(input: ICreateOrderTrackingInput): Promise<void> {
    await new TrackingRepository().saveOrderTracking({
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });
  }
}
