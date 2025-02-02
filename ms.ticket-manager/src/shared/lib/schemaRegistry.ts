import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { envs } from "../../config/env.config";

export const registry = new SchemaRegistry({
  host: envs.kafkaSchemaRegistryHost,
});
