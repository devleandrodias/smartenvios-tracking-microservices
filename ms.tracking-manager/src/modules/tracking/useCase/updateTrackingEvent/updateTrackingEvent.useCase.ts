import { IUpdateTrackingEventInput } from "./updateTrackingEvent.interfaces";
import { TrackingRepository } from "../../infra/typeorm/repositories/tracking.repository";

export class UpdateTrackingEventUseCase {
  async execute(input: IUpdateTrackingEventInput): Promise<void> {
    const { trackingCode, events } = input;

    const repository = new TrackingRepository();

    console.log(
      `TRACKING ENCONTRADO PARA ATUALIZAR EVENTOS DE RASTREIO - [${trackingCode}]`
    );

    await repository.addTrackingEvent(trackingCode, events);
  }
}
