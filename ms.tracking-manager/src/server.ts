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
import { GetTrackingByCodeController } from "./modules/tracking/useCase/getTrackingByCode/getTrackingByCode.controller";
import { UpdateTrackingEventUseCase } from "./modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";
import { GenerateTicketController } from "./modules/tracking/useCase/generateTicket/generateTicket.controller";

const app = express();

app.use(express.json());

app.get("/:trackingCode", new GetTrackingByCodeController().handle);

app.post("/generate-ticket", new GenerateTicketController().handle);

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
