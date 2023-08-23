import colors from "colors";
import express from "express";

import { envs } from "./config/env.config";
import { UpdateTrackingEventUseCase } from "./modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

const app = express();

app.get("/", async (_, res) => {
  await new UpdateTrackingEventUseCase().execute({
    trackingCode: "SM82886187440BM",
    shippingCompany: "carriers",
  });

  return res.status(200).send();
});

app.listen(envs.appPort, () => {
  console.clear();
  console.log(colors.cyan(`Server running at ${envs.appPort}`));
});
