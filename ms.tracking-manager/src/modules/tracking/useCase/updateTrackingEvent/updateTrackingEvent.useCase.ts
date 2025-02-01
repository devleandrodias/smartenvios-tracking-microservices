import { inject, injectable } from "tsyringe";

import { IEvent } from "../../entities/ITracking";
import { IUpdateTrackingEventInput } from "./updateTrackingEvent.interfaces";
import { ITrackingRepository } from "../../repositories/ITrackingRepository";

@injectable()
export class UpdateTrackingEventUseCase {
  constructor(
    @inject("TrackingRepository") private repository: ITrackingRepository
  ) {}

  async execute(input: IUpdateTrackingEventInput): Promise<void> {
    const { trackingCode, events } = input;

    console.info(`[${trackingCode}] - Encontrado novos eventos de rastreio`);

    const smartEnviosEvents: IEvent[] = events.map((event) => ({
      status: event.status,
      location: event.location,
      timestamp: event.timestamp,
    }));

    await this.repository.addTrackingEvent(trackingCode, smartEnviosEvents);
  }
}
