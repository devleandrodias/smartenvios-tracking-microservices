import express from "express";

import { ticketRoutes } from "./ticket/ticket.routes";

const routes = express.Router();

routes.use(ticketRoutes);

export { routes };
