import { Message } from "kafkajs";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../../../lib/kafka/kafka";
import { registry } from "../../../../lib/kafka/schemaRegistry";
import { IGenerateTicketInput } from "./generateTicket.interfaces";
import { EKafkaTopics } from "../../../../shared/enuns/EKafkaTopics";

import {
  TicketSchema,
  ticketSchema,
} from "../../../../shared/schemas/TicketSchema";

export class GenerateTicketUseCase {
  async execute(input: IGenerateTicketInput): Promise<void> {
    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: ticketSchema,
    });

    const ticketCreated: TicketSchema = {
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
