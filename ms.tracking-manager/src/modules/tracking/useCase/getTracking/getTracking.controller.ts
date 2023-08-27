import { Request, Response } from "express";
import { GetTrackingUseCase } from "./getTracking.useCase";

export class GetTrackingCodeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const result = await new GetTrackingUseCase().execute({
      trackingCode: req.params.trackingCode,
    });

    return res.json(result);
  }
}
