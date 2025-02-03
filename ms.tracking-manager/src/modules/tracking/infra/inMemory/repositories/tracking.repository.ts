import { randomUUID } from "node:crypto";

import { IEvent, ITracking } from "../../../entities/ITracking";
import { ESmartEnviosStatus } from "../../../../../shared/enuns/ESmartEnviosStatus";

import { ITrackingRepository } from "../../../repositories/ITrackingRepository";
import { ICreateOrderTrackingInput } from "../../../useCase/createOrderTracking/createOrderTracking.interfaces";

export class TrackingRepositoryInMemory implements ITrackingRepository {
  private readonly trackings: ITracking[] = [];

  async getTrackingNeedUpdate(): Promise<ITracking[]> {
    return this.trackings.filter((tracking) => {
      const lastEvent = tracking.events[tracking.events.length - 1];
      return lastEvent.status !== ESmartEnviosStatus.ENTREGA_REALIZADA;
    });
  }

  async getTrackingByCode(trackingCode: string): Promise<ITracking | null> {
    const tracking = this.trackings.find(
      (tracking) => tracking.trackingCode === trackingCode
    );

    if (!tracking) return null;

    return tracking;
  }

  async saveOrderTracking(
    input: ICreateOrderTrackingInput
  ): Promise<ITracking> {
    const orderTracking: ITracking = {
      id: randomUUID(),
      orderId: input.orderId,
      carrier: input.carrier,
      trackingCode: input.trackingCode,
      events: [
        {
          location: "São Paulo",
          status: ESmartEnviosStatus.COLETADO,
          timestamp: "2025-01-01",
        },
      ],
    } as ITracking;

    this.trackings.push(orderTracking);

    return orderTracking;
  }

  async addTrackingEvent(
    trackingCode: string,
    events: IEvent[]
  ): Promise<void> {
    const tracking = await this.getTrackingByCode(trackingCode);

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    tracking.events.push(...events);
  }
}
