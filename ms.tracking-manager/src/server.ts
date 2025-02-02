import "express-async-errors";
import "reflect-metadata";

import cors from "cors";
import cron from "node-cron";
import express from "express";
import mongoose from "mongoose";
import { container } from "tsyringe";

import "./shared/container";

import { routes } from "./modules/routes";
import { envs } from "./config/env.config";
import { KafkaConsumer } from "./shared/lib/kafka/kafkaConsumer";
import { ScheduleUpdateTrackingsUseCase } from "./modules/tracking/useCase/scheduleUpdateTrackings/scheduleUpdateTrackings.useCase";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(routes);

mongoose
  .connect(envs.mongoUri)
  .then(() => {
    app.listen(envs.appPort, async () => {
      console.clear();

      console.info(`Server running at ${envs.appPort}\n`);

      cron.schedule("*/1 * * * *", async () => {
        await container.resolve(ScheduleUpdateTrackingsUseCase).execute();
      });

      await new KafkaConsumer().consume();
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
