import "reflect-metadata";

import express from 'express'
import { container } from 'tsyringe';
import { GenerateTicketController } from "./useCases/generateTicket/generateTicket.controller";

const ticketRoutes = express.Router()

const getTrackingByCodeController = container.resolve(GenerateTicketController);

ticketRoutes.post("/generate-ticket", getTrackingByCodeController.handle);

export { ticketRoutes }