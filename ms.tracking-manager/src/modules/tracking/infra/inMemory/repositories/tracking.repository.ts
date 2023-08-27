import { randomUUID } from "node:crypto";

import { ESmartEnviosStatus, ITracking } from "../../../entities/ITracking";

import {
  ISaveOrderTrackingInput,
  ITrackingRepository,
} from "../../../repositories/ITrackingRepository";

export class TrackingRepositoryInMemory implements ITrackingRepository {
  private readonly trackings: ITracking[] = [];

  async getTrackingByCode(trackingCode: string): Promise<ITracking | null> {
    const tracking = this.trackings.find(
      (tracking) => tracking.trackingCode === trackingCode
    );

    if (!tracking) return null;

    return tracking;
  }

  async saveOrderTracking(input: ISaveOrderTrackingInput): Promise<ITracking> {
    const orderTracking: ITracking = {
      id: randomUUID(),
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
      events: [],
    };

    this.trackings.push(orderTracking);

    return orderTracking;
  }

  async addTrackingEvent(): Promise<ITracking> {
    const tracking = await this.getTrackingByCode("");

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    tracking.events.push({
      tracking,
      observation: "Coletado no CD",
      status: ESmartEnviosStatus.COLETADO,
    });

    return tracking;
  }
}
