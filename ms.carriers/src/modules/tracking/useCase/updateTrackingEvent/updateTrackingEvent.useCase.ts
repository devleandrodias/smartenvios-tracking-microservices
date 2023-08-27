import { CarrierServices } from "../../../../services/carrier.services";
import { IUpdateTrackingEventInput } from "./updateTrackingEvent.interfaces";
import { UpdateTrackingEventProducer } from "./updateTrackingEvent.producer";

import {
  ITrackingEvent,
  ESmartEnviosStatus,
  UpdateTrackingMessage,
} from "../../../../types/UpdateTrackingMessage";

export class UpdateTrackingEventUseCase {
  private readonly _carrierService: CarrierServices;
  private readonly _updateTrackingEventProducer: UpdateTrackingEventProducer;

  constructor() {
    this._carrierService = new CarrierServices();
    this._updateTrackingEventProducer = new UpdateTrackingEventProducer();
  }

  async execute(input: IUpdateTrackingEventInput): Promise<void> {
    const { trackingCode, shippingCompany } = input;

    const tracking = await this._carrierService.getTrackingByTrackingCode({
      trackingCode,
    });

    const events: ITrackingEvent[] = tracking.Eventos.map((evento) => ({
      description: evento.Descricao,
      status: evento.Status as ESmartEnviosStatus,
    }));

    const message: UpdateTrackingMessage = {
      shippingCompany,
      trackingCode,
      events,
    };

    await this._updateTrackingEventProducer.produce(message);
  }
}
