import "dotenv/config";
import "elastic-apm-node/start.js";

import colors from "colors";
import express from "express";

import { envs } from "./config/env.config";
import { GetTrackingCodeController } from "./modules/tracking/useCase/getTracking/getTracking.controller";
import { UpdateTrackingEventConsumer } from "./modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.consumer";

const app = express();

app.get("/:trackingCode", new GetTrackingCodeController().handle);

app.post("/:trackingCode", async (_, res) => {
  const result = await new UpdateTrackingEventConsumer().consume(
    "SM82886187440BM"
  );

  res.json(result);
});

app.listen(envs.appPort, () => {
  console.clear();
  console.log(colors.cyan(`Server running at ${envs.appPort}`));
});
