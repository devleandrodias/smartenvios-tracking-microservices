import { Message } from "kafkajs";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../../../lib/kafka/kafka";
import { registry } from "../../../../lib/kafka/schemaRegistry";
import { EKafkaTopics } from "../../../../shared/enuns/EKafkaTopics";
import { TrackingRepository } from "../../infra/typeorm/repositories/tracking.repository";

import {
  TrackingSchema,
  trackingSchema,
} from "../../../../shared/schemas/TrackingSchema";

export class ScheduleUpdateTrackingsUseCase {
  async execute() {
    console.log(
      "Executando atualização de eventos de rastreio da transportadora"
    );

    const repository = new TrackingRepository();

    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: trackingSchema,
    });

    const trackings = await repository.getTrackingNeedUpdate();

    const outgoingMessages: Message[] = [];

    for (const tracking of trackings) {
      const message: TrackingSchema = {
        trackingCode: tracking.trackingCode,
        shippingCompany: tracking.shippingCompany,
        events: tracking.events.map((event) => ({
          status: event.status,
          observation: event.observation,
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
