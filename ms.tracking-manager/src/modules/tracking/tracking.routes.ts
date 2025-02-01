import "reflect-metadata";

import express from 'express'
import { container } from 'tsyringe';
import { GetTrackingByCodeController } from './useCase/getTrackingByCode/getTrackingByCode.controller';

const trackingRoutes = express.Router()

const getTrackingByCodeController = container.resolve(GetTrackingByCodeController);

trackingRoutes.get("/:trackingCode", getTrackingByCodeController.handle);

export { trackingRoutes }