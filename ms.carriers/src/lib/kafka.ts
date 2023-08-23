import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "ms-carriers",
  brokers: ["kafka:9092"],
});
