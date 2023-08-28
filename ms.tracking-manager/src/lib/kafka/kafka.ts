import { Kafka, Partitioners } from "kafkajs";

export const kafka = new Kafka({
  clientId: "ms-carriers",
  brokers: ["kafka:9092", "kafka:9094"],
});

export const consumer = kafka.consumer({ groupId: "tracking-manager" });

export const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});
