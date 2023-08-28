import { Message } from "kafkajs";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../../../lib/kafka/kafka";
import { registry } from "../../../../lib/kafka/schemaRegistry";
import { EKafkaTopics } from "../../../../shared/enuns/EKafkaTopics";

import {
  TrackingSchema,
  trackingSchema,
} from "../../../../shared/schemas/TrackingSchema";

export class UpdateTrackingEventProducer {
  async produce(message: TrackingSchema): Promise<void> {
    console.log("Produzindo mensagem de novo evento de rastreio da Carriers");

    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: trackingSchema,
    });

    await producer.connect();

    const outgoingMessage: Message = {
      key: "tracking",
      value: await registry.encode(id, message),
    };

    await producer.send({
      topic: EKafkaTopics.TRACKING_EVENT,
      messages: [outgoingMessage],
    });

    await producer.disconnect();
  }
}
