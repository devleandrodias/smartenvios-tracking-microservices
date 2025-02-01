import express from "express";

import { ticketRoutes } from "./ticket/ticket.routes";
import { trackingRoutes } from "./tracking/tracking.routes";

const routes = express.Router();

routes.use(ticketRoutes)
routes.use(trackingRoutes)

export { routes }