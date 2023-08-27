import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";

export const registry = new SchemaRegistry({
  host: "http://schema-registry:8081/",
});
