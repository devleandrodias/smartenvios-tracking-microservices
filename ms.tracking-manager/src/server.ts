import "dotenv/config";
import "express-async-errors";
import "elastic-apm-node/start.js";

import colors from "colors";
import cron from "node-cron";
import express from "express";

import { envs } from "./config/env.config";
import { AppDataSource } from "./lib/typeorm/data-source";
import { KafkaConsumer } from "./lib/kafka/kafkaConsumer";

import { GenerateTicketUseCase } from "./modules/tracking/useCase/generateTicket/generateTicket.useCase";
import { GetTrackingCodeController } from "./modules/tracking/useCase/getTracking/getTracking.controller";
import { UpdateTrackingEventUseCase } from "./modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

const app = express();

app.get("/tracking/:trackingCode", new GetTrackingCodeController().handle);

// ! Rota utilizada apenas para publicar mensagem que uma etiqueta foi gerada

app.get("/generate-ticket", async (_, res) => {
  await new GenerateTicketUseCase().execute({
    orderId: "77dad97b-d504-48c1-b296-c6af31e25477",
    shippingCompany: "Carriers",
    trackingCode: "SM82886187440BM",
  });

  return res.status(200).send("OK");
});

AppDataSource.initialize().then(() => {
  console.clear();

  console.info(colors.cyan("Database running...\n"));

  app.listen(envs.appPort, async () => {
    console.info(colors.cyan(`Server running at ${envs.appPort}`));

    cron.schedule("*/1 * * * *", async () => {
      await new UpdateTrackingEventUseCase().execute();
    });

    await new KafkaConsumer().consume();
  });
});
