import { Kafka, Partitioners } from "kafkajs";
import { envs } from "../../config/env.config";

export const kafka = new Kafka({
  clientId: envs.kafkaClientId,
  brokers: envs.kafkaBrokers.split(","),
});

export const consumer = kafka.consumer({ groupId: envs.kafkaGroupId });

export const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});
