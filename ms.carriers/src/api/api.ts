import Axios from "axios";

import { envs } from "../config/env.config";

export const carrierApi = Axios.create({
  baseURL: envs.carrierApiUrl,
});
