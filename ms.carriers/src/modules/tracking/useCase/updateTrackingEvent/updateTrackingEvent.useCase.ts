import { CarrierServices } from "../../../../services/carrier.services";
import { UpdateTrackingEventProducer } from "./updateTrackingEvent.producer";
import { EShippingCompany } from "../../../../shared/enuns/EShippingCompany";
import { ESmartEnviosStatus } from "../../../../shared/enuns/ESmartEnviosStatus";

import {
  TrackingEvent,
  TrackingSchema,
} from "../../../../shared/schemas/TrackingSchema";

export class UpdateTrackingEventUseCase {
  private readonly carrierService: CarrierServices;
  private readonly updateTrackingEventProducer: UpdateTrackingEventProducer;

  constructor() {
    this.carrierService = new CarrierServices();
    this.updateTrackingEventProducer = new UpdateTrackingEventProducer();
  }

  async execute(schema: TrackingSchema): Promise<void> {
    const { trackingCode, carrier, orderId } = schema;

    if (carrier === EShippingCompany.CARRIERS) {
      const tracking = await this.carrierService.getTrackingByTrackingCode({
        trackingCode,
      });

      const events: TrackingEvent[] = tracking.Eventos.map((evento) => ({
        location: "São Paulo",
        timestamp: new Date().toString(),
        status: evento.Status as ESmartEnviosStatus,
      }));

      const message: TrackingSchema = {
        events,
        orderId,
        carrier,
        trackingCode,
      };

      await this.updateTrackingEventProducer.produce(message);
    }
  }
}
