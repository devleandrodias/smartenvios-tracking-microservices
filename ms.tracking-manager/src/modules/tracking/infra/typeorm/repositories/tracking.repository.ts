import { Repository } from "typeorm";

import { Tracking } from "../entities/Tracking";
import { ITracking } from "../../../entities/ITracking";
import { AppDataSource } from "../../../../../lib/typeorm/data-source";

import {
  ITrackingRepository,
  ISaveOrderTrackingInput,
} from "../../../repositories/ITrackingRepository";

export class TrackingRepository implements ITrackingRepository {
  private repository: Repository<Tracking>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tracking);
  }

  async saveOrderTracking(input: ISaveOrderTrackingInput): Promise<ITracking> {
    const tracking = this.repository.create({
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });

    await this.repository.save(tracking);

    return tracking;
  }

  async addTrackingEvent(): Promise<ITracking> {
    throw new Error("Method not implemented.");
  }

  async getTrackingByCode(trackingCode: string): Promise<ITracking | null> {
    return this.repository.findOne({
      where: { trackingCode },
      relations: ["events"],
    });
  }

  async getTrackingNeedUpdate(): Promise<ITracking[]> {
    return this.repository.find();
  }
}
