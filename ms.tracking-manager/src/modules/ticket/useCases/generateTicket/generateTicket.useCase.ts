import { Message } from "kafkajs";
import { injectable } from "tsyringe";
import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { IGenerateTicketInput } from "./generateTicket.dtos";
import { producer } from "../../../../shared/lib/kafka/kafka";
import { EKafkaTopics } from "../../../../shared/enuns/EKafkaTopics";
import { registry } from "../../../../shared/lib/kafka/schemaRegistry";

import {
  TicketSchema,
  ticketSchema,
} from "../../../../shared/schemas/TicketSchema";

@injectable()
export class GenerateTicketUseCase {
  async execute(input: IGenerateTicketInput): Promise<void> {
    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: ticketSchema,
    });

    const ticketCreated: TicketSchema = {
      orderId: input.orderId,
      carrier: input.carrier,
      trackingCode: input.trackingCode,
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
