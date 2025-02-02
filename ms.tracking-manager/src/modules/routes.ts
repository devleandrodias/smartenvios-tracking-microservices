import express from "express";

import { trackingRoutes } from "./tracking/tracking.routes";

const routes = express.Router();

routes.use(trackingRoutes);

export { routes };
