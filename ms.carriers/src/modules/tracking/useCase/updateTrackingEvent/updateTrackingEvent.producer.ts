import { SchemaType } from "@kafkajs/confluent-schema-registry";
import { EKafkaTopics, producer } from "../../../../lib/kafka/kafka";
import { registry } from "../../../../lib/kafka/schemaRegistry";
import { UpdateTrackingMessage } from "../../../../types/UpdateTrackingMessage";
import { Message } from "kafkajs";

export class UpdateTrackingEventProducer {
  async produce(message: UpdateTrackingMessage): Promise<void> {
    console.log("Produzindo mensagem de novo evento de rastreio da Carriers");

    const schema = `
      {
        "type": "record",
        "name": "TrackingNewEventSchema",
        "namespace": "tracking",
        "fields": [
          { "name": "trackingCode", "type": "string" },
          { "name": "shippingCompany", "type": "string" },
          { "name": "events", "type": { "type": "array", "items": {
            "name": "TrackingEvent",
            "type": "record",
            "namespace": "tracking",
            "fields": [
              { "name": "description", "type": "string" },
              { "name": "status", "type": "string" }
            ]
          } } }
        ]
      }
    `;

    const { id } = await registry.register({ type: SchemaType.AVRO, schema });

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
