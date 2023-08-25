import { TrackingRepositoryInMemory } from "../../infra/inMemory/tracking.repository";
import {
  IGetTrackingInput,
  IGetTrackingOutput,
} from "./getTracking.interfaces";

export class GetTrackingUseCase {
  async execute(input: IGetTrackingInput): Promise<any> {
    const response = await new TrackingRepositoryInMemory().getTrackingByCode(
      "SM82886187440BM"
    );
    return response;
  }
}
