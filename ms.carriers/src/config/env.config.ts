import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
  carrierApiUrl: env.get("CARRIER_API_URL").required().asString(),
  carrierToken: env.get("CARRIER_TOKEN").required().asString(),
};
