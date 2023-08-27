import { Kafka, Partitioners } from "kafkajs";

export const kafka = new Kafka({
  clientId: "ms-carriers",
  brokers: ["kafka:9092", "kafka:9094"],
});

export const consumer = kafka.consumer({ groupId: "ms-carriers" });

export const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

export enum EKafkaTopics {
  TICKET_CREATED = "ticket-created",
  TRACKING_EVENT = "tracking-event",
  TRACKING_UPDATE = "tracking-update",
}

export enum EKafkaSchemas {
  TICKET_CREATED = "ticket-created-schema",
  TRACKING_EVENT = "tracking-event-schema",
  TRACKING_UPDATE = "tracking-update-schema",
}
