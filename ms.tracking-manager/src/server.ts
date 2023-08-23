import colors from "colors";
import express from "express";
import { envs } from "./config/env.config";

const app = express();

app.get("/", (_, res) => res.json({ ok: "Tracking Manager" }));

app.listen(envs.appPort, () => {
  console.clear();
  console.log(colors.cyan(`Server running at ${envs.appPort}`));
});
