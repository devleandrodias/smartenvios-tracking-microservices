import "elastic-apm-node/start";

import express from "express";

import { envs } from "./config/env.config";
import { KafkaConsumer } from "./shared/lib/kafka/kafkaConsumer";

const app = express();

app.listen(envs.appPort, async () => {
  console.clear();

  console.info(`Server running at ${envs.appPort}\n`);

  await new KafkaConsumer().consume();
});
