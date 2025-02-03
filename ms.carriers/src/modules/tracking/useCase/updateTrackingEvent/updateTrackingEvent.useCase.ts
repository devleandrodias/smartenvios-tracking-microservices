import { format, parse } from "date-fns";
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

      const events: TrackingEvent[] = tracking.Eventos.map((evento) => {
        const referenceDate = new Date();
        const formatString = "dd-MM-yyyy HH:mm:ss";
        const parsedDate = parse(evento.Data, formatString, referenceDate);
        const isoString = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");

        return {
          location: "São Paulo",
          timestamp: isoString,
          status: evento.Status as ESmartEnviosStatus,
        };
      });

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
