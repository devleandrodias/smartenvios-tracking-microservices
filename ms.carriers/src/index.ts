import colors from "colors";
import express from "express";

const app = express();

app.get("/", (_, res) => res.json({ ok: "Carriers" }));

app.listen(4000, () => {
  console.clear();
  console.log(colors.cyan(`Server running at ${4000}`));
});
