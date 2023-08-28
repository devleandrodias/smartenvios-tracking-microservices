import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
  carrierApiUrl: env.get("CARRIER_API_URL").required().asString(),
  carrierToken: env.get("CARRIER_TOKEN").required().asString(),
  kafkaBrokers: env.get("KAFKA_BROKERS").required().asString(),
  kafkaClientId: env.get("KAFKA_CLIENT_ID").required().asString(),
  kafkaGroupId: env.get("KAFKA_GROUP_ID").required().asString(),
  kafkaSchemaRegistryHost: env
    .get("KAFKA_SCHEMA_REGISTRY_HOST")
    .required()
    .asString(),
};
