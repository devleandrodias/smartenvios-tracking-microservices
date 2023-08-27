import { Message } from "kafkajs";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { registry } from "../../../../lib/kafka/schemaRegistry";
import { EKafkaTopics, producer } from "../../../../lib/kafka/kafka";
import { TrackingUpdateSchema } from "../../../../types/KafkaMessageSchemas";

export class UpdateTrackingEventUseCase {
  async execute() {
    console.log("Executado pela cron...", new Date().getTime());

    const schema = `
      {
        "type": "record",
        "name": "TrackingUpdateSchema",
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

    const ticketCreated: TrackingUpdateSchema = {
      shippingCompany: "Carriers",
      trackingCode: "SM82886187440BM",
      events: [],
    };

    const outgoingMessage: Message = {
      key: "tracking",
      value: await registry.encode(id, ticketCreated),
    };

    await producer.connect();

    await producer.send({
      topic: EKafkaTopics.TRACKING_UPDATE,
      messages: [outgoingMessage],
    });

    await producer.disconnect();
  }
}
