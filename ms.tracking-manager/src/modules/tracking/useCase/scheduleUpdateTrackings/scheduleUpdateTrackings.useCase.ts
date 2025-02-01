import { Message } from "kafkajs";
import { format } from "date-fns";
import { inject, injectable } from "tsyringe";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../../../shared/lib/kafka/kafka";
import { EKafkaTopics } from "../../../../shared/enuns/EKafkaTopics";
import { registry } from "../../../../shared/lib/kafka/schemaRegistry";
import { ITrackingRepository } from "../../repositories/ITrackingRepository";
import { ESmartEnviosStatus } from "../../../../shared/enuns/ESmartEnviosStatus";

import {
  TrackingSchema,
  trackingSchema,
} from "../../../../shared/schemas/TrackingSchema";

@injectable()
export class ScheduleUpdateTrackingsUseCase {
  constructor(
    @inject("TrackingRepository") private repository: ITrackingRepository
  ) {}

  async execute() {
    console.info(
      `[${format(
        new Date(),
        "dd/MM/yyyy HH:mm:ss"
      )}] - Executando atualização dos eventos de rastreio`
    );

    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: trackingSchema,
    });

    const trackings = await this.repository.getTrackingNeedUpdate();

    const outgoingMessages: Message[] = [];

    for (const tracking of trackings) {
      const message: TrackingSchema = {
        carrier: tracking.carrier,
        orderId: tracking.orderId,
        trackingCode: tracking.trackingCode,
        events: tracking.events.map((event) => ({
          location: event.location,
          timestamp: event.timestamp,
          status: event.status as ESmartEnviosStatus,
        })),
      };

      const outgoingMessage: Message = {
        key: "tracking",
        value: await registry.encode(id, message),
      };

      outgoingMessages.push(outgoingMessage);
    }

    await producer.connect();

    await producer.send({
      topic: EKafkaTopics.TRACKING_UPDATE,
      messages: outgoingMessages,
    });

    await producer.disconnect();
  }
}
