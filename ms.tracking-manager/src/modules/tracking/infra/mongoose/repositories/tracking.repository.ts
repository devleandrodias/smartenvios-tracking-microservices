import { TrackingModel } from "../models/tracking.model";
import { IEvent, ITracking } from "../../../entities/ITracking";
import { ITrackingRepository } from "../../../repositories/ITrackingRepository";
import { ICreateOrderTrackingInput } from "../../../useCase/createOrderTracking/createOrderTracking.interfaces";

export class TrackingRepository implements ITrackingRepository {
  async saveOrderTracking(
    input: ICreateOrderTrackingInput
  ): Promise<ITracking> {
    const tracking = new TrackingModel({
      carrier: input.carrier,
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      events: [],
    });

    await tracking.save();

    return tracking;
  }

  async addTrackingEvent(
    trackingCode: string,
    events: IEvent[]
  ): Promise<void> {
    const tracking = await this.getTrackingByCode(trackingCode);

    if (tracking) {
      const existingStatuses = tracking.events.map((event) => event.status);

      events.forEach((event) => {
        if (!existingStatuses.includes(event.status)) {
          tracking.events.push(event);
        }
      });

      await tracking.save();
    }
  }

  async getTrackingByCode(trackingCode: string): Promise<ITracking | null> {
    return await TrackingModel.findOne({ trackingCode }).exec();
  }

  async getTrackingNeedUpdate(): Promise<ITracking[]> {
    return await TrackingModel.find().exec();
  }
}
