import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express from "express";

import "./shared/container";

import { routes } from "./modules/routes";
import { envs } from "./config/env.config";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(routes);

app.listen(envs.appPort, async () => {
  console.clear();
  console.info(`[ms.ticket-manager] - Server running at ${envs.appPort}\n`);
});
