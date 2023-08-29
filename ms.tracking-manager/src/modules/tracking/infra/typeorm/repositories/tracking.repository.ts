import { Repository } from "typeorm";

import { Tracking } from "../entities/Tracking";
import { TrackingEvent } from "../entities/TrackingEvents";
import { AppDataSource } from "../../../../../lib/typeorm/data-source";
import { ITracking, ITrackingEvent } from "../../../entities/ITracking";

import {
  ITrackingRepository,
  ISaveOrderTrackingInput,
} from "../../../repositories/ITrackingRepository";

export class TrackingRepository implements ITrackingRepository {
  private repositoryTracking: Repository<Tracking>;
  private repositoryTrackingEvent: Repository<TrackingEvent>;

  constructor() {
    this.repositoryTracking = AppDataSource.getRepository(Tracking);
    this.repositoryTrackingEvent = AppDataSource.getRepository(TrackingEvent);
  }

  async saveOrderTracking(input: ISaveOrderTrackingInput): Promise<ITracking> {
    const tracking = this.repositoryTracking.create({
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });

    await this.repositoryTracking.save(tracking);

    return tracking;
  }

  async addTrackingEvent(
    trackingCode: string,
    events: ITrackingEvent[]
  ): Promise<void> {
    const tracking = await this.getTrackingByCode(trackingCode);

    if (tracking) {
      const trackingEvents = await this.repositoryTrackingEvent.find({
        where: { trackingId: tracking.id },
      });

      events.forEach((eventData) => {
        const statusAlreadyExists = trackingEvents.find(
          (event) => event.status === event.status
        );

        if (!statusAlreadyExists) {
          const newEvent = this.repositoryTrackingEvent.create({
            trackingId: tracking.id,
            status: eventData.status,
            observation: eventData.observation,
          });

          tracking.events.push(newEvent);
        }
      });

      await this.repositoryTrackingEvent.save(tracking.events);
    }
  }

  async getTrackingByCode(trackingCode: string): Promise<ITracking | null> {
    return this.repositoryTracking.findOne({
      where: { trackingCode },
      relations: ["events"],
    });
  }

  async getTrackingNeedUpdate(): Promise<ITracking[]> {
    return this.repositoryTracking.find({
      relations: ["events"],
    });
  }
}
