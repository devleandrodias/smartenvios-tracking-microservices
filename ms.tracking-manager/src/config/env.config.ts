import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
  databaseHost: env.get("DATABASE_HOST").required().asString(),
  databasePort: env.get("DATABASE_PORT").required().asPortNumber(),
  databaseUsername: env.get("DATABASE_USERNAME").required().asString(),
  databasePassword: env.get("DATABASE_PASSWORD").required().asString(),
  databaseDatabase: env.get("DATABASE_DATABASE").required().asString(),
  kafkaBrokers: env.get("KAFKA_BROKERS").required().asString(),
  kafkaClientId: env.get("KAFKA_CLIENT_ID").required().asString(),
  kafkaGroupId: env.get("KAFKA_GROUP_ID").required().asString(),
  kafkaSchemaRegistryHost: env
    .get("KAFKA_SCHEMA_REGISTRY_HOST")
    .required()
    .asString(),
};
