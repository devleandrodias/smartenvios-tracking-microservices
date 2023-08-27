import "dotenv/config";
import "elastic-apm-node/start";

import colors from "colors";
import express from "express";

import { envs } from "./config/env.config";
import { UpdateTrackingEventConsumer } from "./modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.consumer";

const app = express();

app.listen(envs.appPort, async () => {
  console.clear();
  console.log(colors.cyan(`Server running at ${envs.appPort}`));
  await new UpdateTrackingEventConsumer().consume();
});
