import { CarrierServices } from "../../../../services/carrier.services";
import { ESmartEnviosStatus } from "../../../../shared/enuns/ESmartEnviosStatus";
import { UpdateTrackingEventProducer } from "./updateTrackingEvent.producer";

import {
  TrackingEvent,
  TrackingSchema,
} from "../../../../shared/schemas/TrackingSchema";

export class UpdateTrackingEventUseCase {
  private readonly _carrierService: CarrierServices;
  private readonly _updateTrackingEventProducer: UpdateTrackingEventProducer;

  constructor() {
    this._carrierService = new CarrierServices();
    this._updateTrackingEventProducer = new UpdateTrackingEventProducer();
  }

  async execute(schema: TrackingSchema): Promise<void> {
    const { trackingCode, shippingCompany } = schema;

    const tracking = await this._carrierService.getTrackingByTrackingCode({
      trackingCode,
    });

    const events: TrackingEvent[] = tracking.Eventos.map((evento) => ({
      observation: evento.Descricao,
      status: evento.Status as ESmartEnviosStatus,
    }));

    const message: TrackingSchema = {
      shippingCompany,
      trackingCode,
      events,
    };

    await this._updateTrackingEventProducer.produce(message);
  }
}
