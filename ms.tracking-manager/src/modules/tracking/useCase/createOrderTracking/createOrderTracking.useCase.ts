import { TrackingRepositoryInMemory } from "../../infra/inMemory/tracking.repository";
import { ICreateOrderTrackingInput } from "./createOrderTracking.interfaces";

export class CreateOrderTrackingUseCase {
  async execute(input: ICreateOrderTrackingInput): Promise<void> {
    await new TrackingRepositoryInMemory().saveOrderTracking();
  }
}
