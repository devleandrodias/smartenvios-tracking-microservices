import { Message } from "kafkajs";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { registry } from "../../../../lib/schemaRegistry";
import { EKafkaTopics, producer } from "../../../../lib/kafka";
import { TicketCreatedSchema } from "../../../../types/KafkaMessageSchemas";

interface IGenerateTicketInput {
  orderId: string;
  trackingCode: string;
  shippingCompany: string;
}

export class GenerateTicketUseCase {
  async execute(input: IGenerateTicketInput) {
    const schema = `
    {
      "type": "record",
      "name": "TicketCreatedSchema",
      "namespace": "ticket",
      "fields": [
        { "name": "orderId", "type": "string" },
        { "name": "trackingCode", "type": "string" },
        { "name": "shippingCompany", "type": "string" }
      ]
    }`;

    const { id } = await registry.register({ type: SchemaType.AVRO, schema });

    const ticketCreated: TicketCreatedSchema = {
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    };

    const outgoingMessage: Message = {
      key: "ticket",
      value: await registry.encode(id, ticketCreated),
    };

    await producer.connect();

    await producer.send({
      topic: EKafkaTopics.TICKET_CREATED,
      messages: [outgoingMessage],
    });

    await producer.disconnect();
  }
}
